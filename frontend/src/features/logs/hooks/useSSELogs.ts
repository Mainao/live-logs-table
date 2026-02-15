import { useEffect, useState } from "react";
import type { Log } from "../types/log.types";

const MAX_LOGS = 500;

export default function useSSELogs() {
  const [logs, setLogs] = useState<Log[]>([]);

  useEffect(() => {
    const url = import.meta.env.VITE_SSE_URL;
    const source = new EventSource(url);

    source.onmessage = (event) => {
      const log: Log = JSON.parse(event.data);

      setLogs((prev) => [log, ...prev].slice(0, MAX_LOGS));
    };

    source.onerror = (err) => {
      console.error("SSE connection error:", err);
      source.close();
    };

    return () => source.close();
  }, []);

  return logs;
}
