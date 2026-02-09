import fs from "fs";
import path from "path";
import zlib from "zlib";

export class LogRotator {
  constructor(options = {}) {
    const { dir = '.', filename = 'app.log', maxBytes = 1024 * 1024 } = options;
    this.dir = dir;
    this.filename = filename;
    this.filePath = path.join(this.dir, this.filename);
    this.maxBytes = maxBytes;
    if (!fs.existsSync(this.dir)) fs.mkdirSync(this.dir, { recursive: true });
  }

  _timestamp() {
    return new Date().toISOString().replace(/:/g, '-').split('.')[0];
  }

  _rotateIfNeeded() {
    try {
      if (!fs.existsSync(this.filePath)) return;
      const { size } = fs.statSync(this.filePath);
      if (size >= this.maxBytes) {
        const rotated = `${this.filePath}.${this._timestamp()}`;
        fs.renameSync(this.filePath, rotated);
        try {
          const data = fs.readFileSync(rotated);
          const gz = zlib.gzipSync(data);
          const gzPath = `${rotated}.gz`;
          fs.writeFileSync(gzPath, gz);
          fs.unlinkSync(rotated);
        } catch (err) {
          // If compression fails, leave the rotated file in place
          console.error('Compression error:', err && err.message ? err.message : err);
        }
      }
    } catch (err) {
      console.error('Rotate error:', err && err.message ? err.message : err);
    }
  }

  log(message) {
    try {
      this._rotateIfNeeded();
      const line = `[${new Date().toISOString()}] ${message}\n`;
      fs.appendFileSync(this.filePath, line, { encoding: 'utf8' });
    } catch (err) {
      console.error('Log error:', err && err.message ? err.message : err);
    }
  }
}

export function createLogger(opts) {
  return new LogRotator(opts);
}
