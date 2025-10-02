"use client";

import { motion } from "framer-motion";

interface WearBadgeProps {
  wear: number;
}

export function WearBadge({ wear }: WearBadgeProps) {
  const percent = Math.round(wear * 100);
  const status = percent > 25 ? "critical" : percent > 15 ? "warning" : "stable";
  const label = status === "critical" ? "Firewall bite" : status === "warning" ? "Trace risk" : "Packet captured";
  const color = status === "critical" ? "#FF3B3B" : status === "warning" ? "#FFD166" : "#0FF5C6";

  return (
    <motion.span
      className="flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs uppercase tracking-[0.3em] text-text-muted"
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      style={{ boxShadow: `0 0 12px ${color}44` }}
    >
      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
      {label} {percent}%
    </motion.span>
  );
}
