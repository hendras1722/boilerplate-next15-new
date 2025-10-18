"use client";

import { useEffect, useState } from "react";
import { Each } from "use-react-utilities";

export default function LogsPage() {
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    const fetchLogs = async () => {
      const res = await fetch("/api/logs");
      const data = await res.json();
      setLogs(data);
    };
    fetchLogs();
    const interval = setInterval(fetchLogs, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 font-mono text-sm bg-black text-green-400 min-h-screen">
      <h1 className="text-xl mb-4 text-white">🧾 Server Logs</h1>
      {logs.length === 0 && <p>No logs yet...</p>}

      <Each of={logs} render={(log, i) => (
        <div key={i} className="border-b border-gray-700 py-1">
          <span className="text-gray-500">[{log.time}]</span> {log.message}
        </div>
      )} />
    </div>
  );
}
