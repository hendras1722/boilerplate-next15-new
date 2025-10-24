import fs from "fs";
import path from "path";

const logFilePath = path.join(process.cwd(), "logs.json");

export interface LogItem {
  level: "info" | "warn" | "error";
  context?: string;
  message: string;
  timestamp: string;
  file?: string;
  line?: string;
  column?: string;
  stack?: string;
}

function ensureLogFile() {
  if (!fs.existsSync(logFilePath)) {
    fs.writeFileSync(logFilePath, "[]", "utf-8");
  }
}

export function addLog(
  level: LogItem["level"],
  message: string,
  context?: string,
  extra: Partial<LogItem> = {}
) {
  ensureLogFile();

  try {
    const raw             = fs.readFileSync(logFilePath, "utf-8");
    const logs: LogItem[] = raw ? JSON.parse(raw) : [];

    const newLog: LogItem = {
      level,
      context,
      message,
      timestamp: new Date().toISOString(),
      ...extra,
    };

    logs.push(newLog);

    // Simpan hanya 100 log terakhir
    fs.writeFileSync(logFilePath, JSON.stringify(logs.slice(-100), null, 2));
  } catch (error) {
    console.error("Failed to write log:", error);
  }
}

export const logError = (
  message: string,
  context?: string,
  extra?: Partial<LogItem>
) => addLog("error", message, context, extra);

export const logWarn = (
  message: string,
  context?: string,
  extra?: Partial<LogItem>
) => addLog("warn", message, context, extra);

export const logInfo = (
  message: string,
  context?: string,
  extra?: Partial<LogItem>
) => addLog("info", message, context, extra);

export function getLogs(): LogItem[] {
  ensureLogFile();
  try {
    return JSON.parse(fs.readFileSync(logFilePath, "utf-8"));
  } catch {
    return [];
  }
}
