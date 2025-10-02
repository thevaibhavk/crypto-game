"use client";

import { useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const storageKey = "cred.audio-muted";

export function AudioToggle() {
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(storageKey);
    if (stored) {
      setIsMuted(stored === "true");
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(storageKey, String(isMuted));
  }, [isMuted]);

  return (
    <button
      onClick={() => setIsMuted((prev) => !prev)}
      className="focus-ring relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-md border border-white/10 bg-white/5 transition duration-200 hover:border-white/20 hover:text-white"
      aria-label={isMuted ? "Unmute audio" : "Mute audio"}
    >
      <span className="absolute inset-0 translate-y-full bg-[linear-gradient(120deg,rgba(15,245,198,0.3),rgba(255,46,136,0.2))] opacity-70 transition-transform duration-300 hover:translate-y-0" />
      <motion.span
        key={String(isMuted)}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10"
      >
        {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
      </motion.span>
      <motion.span
        animate={{ opacity: isMuted ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        className={cn(
          "pointer-events-none absolute bottom-2 text-[10px] uppercase tracking-[0.3em] text-chroma-magenta",
          !isMuted && "opacity-0"
        )}
      >
        mute
      </motion.span>
    </button>
  );
}
