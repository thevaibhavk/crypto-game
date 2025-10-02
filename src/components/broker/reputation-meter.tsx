"use client";

import { motion } from "framer-motion";

interface ReputationMeterProps {
  level: number;
  max?: number;
}

export function ReputationMeter({ level, max = 5 }: ReputationMeterProps) {
  return (
    <div className="space-y-3 rounded-lg border border-white/10 bg-white/5 p-5 backdrop-blur">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.4em] text-text-tertiary">Reputation Gauge</p>
        <span className="rounded-full border border-white/10 bg-black/50 px-3 py-1 text-xs text-text-muted">
          Level {level}
        </span>
      </div>
      <div className="grid grid-cols-5 gap-2">
        {Array.from({ length: max }).map((_, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.06, duration: 0.3, ease: "easeOut" }}
            className="relative h-12 overflow-hidden rounded-md border border-white/10"
          >
            <span className="absolute inset-0 bg-black/50" />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: idx < level ? 1 : 0.1 }}
              transition={{ delay: 0.35 + idx * 0.04, duration: 0.4, ease: "easeInOut" }}
              className="absolute inset-0 bg-[radial-gradient(circle,_rgba(15,245,198,0.45),_rgba(124,77,255,0.3))]"
            />
            <motion.div
              animate={{ y: idx < level ? [12, 0, 12] : 12 }}
              transition={{ repeat: idx < level ? Infinity : 0, duration: 1.4, ease: "easeInOut" }}
              className="absolute inset-x-0 bottom-0 h-1 bg-chroma-teal"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
