import pino from "pino";
import fs from "fs";
import path from "path";

const logFilePath = path.join(process.cwd(), "logs.json");

if (!fs.existsSync(logFilePath)) {
  fs.writeFileSync(logFilePath, "[]", "utf-8");
}

export const logger = pino({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
});

export function logError(error: unknown, context?: string) {
  const message =
    error instanceof Error ? error.message : JSON.stringify(error);
  const entry = {
    time: new Date().toISOString(),
    context,
    message,
  };

  try {
    const logs = JSON.parse(fs.readFileSync(logFilePath, "utf-8"));
    logs.push(entry);
    fs.writeFileSync(logFilePath, JSON.stringify(logs.slice(-30), null, 0));
  } catch (e) {
    console.error("Failed to write log:", e);
  }

  logger.error(entry);
}

// baca log dari file
export function getLogs() {
  try {
    const logs = JSON.parse(fs.readFileSync(logFilePath, "utf-8"));
    return logs;
  } catch {
    return [];
  }
}
