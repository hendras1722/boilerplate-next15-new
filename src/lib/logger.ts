import fs from "fs";
import path from "path";

const logFilePath = path.join(process.cwd(), "logs.json");

export interface LogItem {
  level: "info" | "warn" | "error";
  context?: string;
  message: string;
  timestamp: string;
}

function ensureLogFile() {
  if (!fs.existsSync(logFilePath)) {
    fs.writeFileSync(logFilePath, "[]", "utf-8");
  }
}

export function addLog(level: LogItem["level"], message: string, context?: string) {
  ensureLogFile();
  const raw = fs.readFileSync(logFilePath, "utf-8");
  const logs: LogItem[] = raw ? JSON.parse(raw) : [];

  const newLog: LogItem = {
    level,
    context,
    message,
    timestamp: new Date().toISOString(),
  };

  logs.push(newLog);

  // Simpan hanya 50 log terakhir
  fs.writeFileSync(logFilePath, JSON.stringify(logs.slice(-50), null, 0));
}

export const logError = (message: string, context?: string) => addLog("error", message, context);
export const logWarn = (message: string, context?: string) => addLog("warn", message, context);
export const logInfo = (message: string, context?: string) => addLog("info", message, context);

export function getLogs(): LogItem[] {
  ensureLogFile();
  return JSON.parse(fs.readFileSync(logFilePath, "utf-8"));
}
