import { useCallback, useEffect, useRef, useState } from "react";
import type { SSEEvent } from "@/types/game";

export type UseSSEOptions = {
  url: string; // e.g. "/api/sse" (server must stream text/event-stream)
  autoStart?: boolean;
  onEvent?: (evt: SSEEvent) => void;
  onError?: (err: any) => void;
};

export function useSSE({ url, autoStart = false, onEvent, onError }: UseSSEOptions) {
  const esRef = useRef<EventSource | null>(null);
  const [isConnected, setConnected] = useState(false);
  const [lastEvent, setLastEvent] = useState<SSEEvent | null>(null);
  const [error, setError] = useState<any>(null);
  const retryTimeout = useRef<number | null>(null);

  const stop = useCallback(() => {
    if (retryTimeout.current) {
      window.clearTimeout(retryTimeout.current);
      retryTimeout.current = null;
    }
    if (esRef.current) {
      esRef.current.close();
      esRef.current = null;
      setConnected(false);
    }
  }, []);

  const start = useCallback(() => {
    try {
      stop();
      const es = new EventSource(url, { withCredentials: true });
      esRef.current = es;

      es.onopen = () => setConnected(true);
      es.onerror = (e) => {
        setConnected(false);
        setError(e);
        onError?.(e);
        // simple reconnect after delay
        if (!retryTimeout.current) {
          retryTimeout.current = window.setTimeout(() => {
            retryTimeout.current = null;
            start();
          }, 5000);
        }
      };
      es.onmessage = (msg) => {
        try {
          const parsed: SSEEvent = JSON.parse(msg.data);
          setLastEvent(parsed);
          onEvent?.(parsed);
        } catch (err) {
          // ignore non-JSON events or heartbeat
        }
      };
    } catch (err) {
      setError(err);
      onError?.(err);
    }
  }, [onError, onEvent, stop, url]);

  useEffect(() => {
    if (autoStart) start();
    return () => stop();
  }, [autoStart, start, stop]);

  return { start, stop, isConnected, lastEvent, error } as const;
}
