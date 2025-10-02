import { useEffect, useMemo, useRef } from "react";
import type { SSEEvent } from "@/types/game";

export type AudioKey =
  | "broker:pull"
  | "broker:success"
  | "broker:fail"
  | "rig:update"
  | "refinery:submit"
  | "refinery:complete"
  | "claims:claim"
  | "darkweb:success"
  | "darkweb:fail";

export type AudioMap = Partial<Record<AudioKey, string>>; // key -> audio file URL

export function useAudioTriggers(map: AudioMap) {
  const buffers = useRef<Map<string, HTMLAudioElement>>(new Map());

  // lazily create audio elements
  const getAudio = (key: AudioKey) => {
    const url = map[key];
    if (!url) return null;
    if (!buffers.current.has(key)) {
      const audio = new Audio(url);
      audio.preload = "auto";
      buffers.current.set(key, audio);
    }
    return buffers.current.get(key)!;
  };

  const play = (key: AudioKey) => {
    const a = getAudio(key);
    if (!a) return;
    try {
      a.currentTime = 0;
      void a.play();
    } catch (_) {
      // ignore autoplay errors; will play after user gesture
    }
  };

  return useMemo(() => ({ play }), []);
}

// Optional: helper to map SSE events to audio keys
export function sseToAudioKey(evt: SSEEvent): AudioKey | null {
  switch (evt.type) {
    case "refinery:job-update":
      return "refinery:complete"; // when hooked to completion events
    case "rig:update":
      return "rig:update";
    case "claims:cycle-update":
      return "claims:claim"; // when balance increases or claim executed
    case "darkweb:attempt-result":
      return evt.data.result === "success" ? "darkweb:success" : "darkweb:fail";
    case "broker:order-settled":
      return "broker:success";
    default:
      return null;
  }
}
