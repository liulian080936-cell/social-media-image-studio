import { createServer } from "node:http";
import { createReadStream, existsSync } from "node:fs";
import { readFile, rm, stat, writeFile } from "node:fs/promises";
import { execFile } from "node:child_process";
import { tmpdir } from "node:os";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const rootDir = normalize(join(fileURLToPath(new URL(".", import.meta.url)), ".."));
const host = "127.0.0.1";
const port = Number(process.env.PORT || 8786);
const execFileAsync = promisify(execFile);
const MAX_IMPORT_BYTES = 40 * 1024 * 1024;

const mimeTypes = {
  ".avif": "image/avif",
  ".bmp": "image/bmp",
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".heic": "image/heic",
  ".heif": "image/heif",
  ".html": "text/html; charset=utf-8",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml; charset=utf-8",
  ".tif": "image/tiff",
  ".tiff": "image/tiff",
  ".webp": "image/webp",
};

function writeJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    "Cache-Control": "no-store",
    "Content-Type": "application/json; charset=utf-8",
  });
  response.end(JSON.stringify(payload));
}

function decodeFileNameHeader(value) {
  const headerValue = Array.isArray(value) ? value[0] : value;

  if (!headerValue) {
    return "";
  }

  try {
    return decodeURIComponent(headerValue);
  } catch {
    return String(headerValue);
  }
}

function sanitizeTempSegment(value, fallback = "image") {
  return String(value || fallback)
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    || fallback;
}

function buildTempPaths(fileName) {
  const extension = extname(fileName) || ".img";
  const baseName = fileName.replace(/\.[^.]+$/, "") || "upload-image";
  const stamp = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const safeStem = sanitizeTempSegment(baseName, "upload-image");
  const safeExtension = sanitizeTempSegment(extension, ".img").startsWith(".")
    ? sanitizeTempSegment(extension, ".img")
    : `.${sanitizeTempSegment(extension, "img")}`;
  const root = join(tmpdir(), `social-media-image-studio-${safeStem}-${stamp}`);

  return {
    inputPath: `${root}${safeExtension}`,
    outputPath: `${root}.png`,
  };
}

function readRequestBody(request, maxBytes) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let totalBytes = 0;
    let finished = false;

    request.on("data", (chunk) => {
      if (finished) {
        return;
      }

      totalBytes += chunk.length;

      if (totalBytes > maxBytes) {
        finished = true;
        reject(Object.assign(new Error("payload-too-large"), { code: "payload-too-large" }));
        request.destroy();
        return;
      }

      chunks.push(chunk);
    });

    request.on("end", () => {
      if (!finished) {
        finished = true;
        resolve(Buffer.concat(chunks));
      }
    });

    request.on("error", (error) => {
      if (!finished) {
        finished = true;
        reject(error);
      }
    });
  });
}

async function handleImageConvert(request, response) {
  const fileName = decodeFileNameHeader(request.headers["x-file-name"]) || "upload-image";
  const { inputPath, outputPath } = buildTempPaths(fileName);

  try {
    const fileBuffer = await readRequestBody(request, MAX_IMPORT_BYTES);

    if (fileBuffer.length === 0) {
      writeJson(response, 400, { error: "没有收到图片数据，请重新选择文件再试。" });
      return;
    }

    await writeFile(inputPath, fileBuffer);
    await execFileAsync("sips", ["-s", "format", "png", inputPath, "--out", outputPath]);

    const convertedBuffer = await readFile(outputPath);
    const convertedFileName = `${fileName.replace(/\.[^.]+$/, "") || "converted-image"}.png`;

    response.writeHead(200, {
      "Cache-Control": "no-store",
      "Content-Type": "image/png",
      "X-Converted-File-Name": encodeURIComponent(convertedFileName),
    });
    response.end(convertedBuffer);
  } catch (error) {
    if (error?.code === "payload-too-large") {
      writeJson(response, 413, { error: "图片太大了，请控制在 40MB 以内再试。" });
      return;
    }

    writeJson(response, 415, {
      error: "这类图片已尝试本地转换，但没有成功。请先转成 JPG / PNG / WebP 后再试。",
    });
  } finally {
    await Promise.allSettled([
      rm(inputPath, { force: true }),
      rm(outputPath, { force: true }),
    ]);
  }
}

const server = createServer(async (request, response) => {
  const requestUrl = new URL(request.url || "/", `http://${host}:${port}`);

  if (request.method === "POST" && requestUrl.pathname === "/api/convert-image") {
    await handleImageConvert(request, response);
    return;
  }

  const requestedPath = requestUrl.pathname === "/" ? "/index.html" : requestUrl.pathname;
  const safePath = normalize(join(rootDir, requestedPath));

  if (!safePath.startsWith(rootDir) || !existsSync(safePath)) {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
    return;
  }

  try {
    const fileStat = await stat(safePath);

    if (!fileStat.isFile()) {
      response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Not found");
      return;
    }

    const mimeType = mimeTypes[extname(safePath)] || "application/octet-stream";
    response.writeHead(200, {
      "Cache-Control": "no-store",
      "Content-Type": mimeType,
    });
    createReadStream(safePath).pipe(response);
  } catch {
    response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Server error");
  }
});

server.listen(port, host, () => {
  console.log(`Social Media Image Studio running at http://${host}:${port}`);
});
