import { useEffect, useRef, useState } from "react";
import type { Log } from "../types/log.types";

const MAX_LOGS = 500;
const INITIAL_RETRY_MS = 1000;
const MAX_RETRY_MS = 30000;

const VALID_LEVELS = new Set(["INFO", "WARN", "ERROR"]);

function isValidLog(data: unknown): data is Log {
  if (typeof data !== "object" || data === null) return false;
  const obj = data as Record<string, unknown>;
  return (
    typeof obj.id === "number" &&
    typeof obj.timestamp === "string" &&
    typeof obj.level === "string" &&
    VALID_LEVELS.has(obj.level) &&
    typeof obj.service === "string" &&
    typeof obj.message === "string"
  );
}

export default function useSSELogs() {
  const [logs, setLogs] = useState<Log[]>([]);
  const retryMs = useRef(INITIAL_RETRY_MS);
  const retryTimeout = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const url = import.meta.env.VITE_SSE_URL;
    let source: EventSource | null = null;
    let cancelled = false;

    function connect() {
      if (cancelled) return;

      source = new EventSource(url);

      source.onopen = () => {
        retryMs.current = INITIAL_RETRY_MS;
      };

      source.onmessage = (event) => {
        try {
          const data: unknown = JSON.parse(event.data);
          if (!isValidLog(data)) {
            console.warn("Invalid log payload:", event.data);
            return;
          }
          setLogs((prev) => [data, ...prev].slice(0, MAX_LOGS));
        } catch {
          console.error("Failed to parse SSE event:", event.data);
        }
      };

      source.onerror = () => {
        source?.close();
        source = null;

        if (cancelled) return;

        const delay = retryMs.current;
        console.warn(`SSE disconnected. Reconnecting in ${delay}ms…`);
        retryTimeout.current = setTimeout(connect, delay);
        retryMs.current = Math.min(retryMs.current * 2, MAX_RETRY_MS);
      };
    }

    connect();

    return () => {
      cancelled = true;
      source?.close();
      clearTimeout(retryTimeout.current);
    };
  }, []);

  return logs;
}
