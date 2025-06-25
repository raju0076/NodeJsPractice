import fs from 'fs';
import path from 'path';

const logFile = path.join('logs', 'requests.log');

export function requestLogger(req, res, next) {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    const log = `[${new Date().toISOString()}] ${req.method} ${req.url} ${res.statusCode} - ${duration}ms\n`;
    fs.appendFileSync(logFile, log);
  });

  next();
}
