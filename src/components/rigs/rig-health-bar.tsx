"use client";

import { motion } from "framer-motion";

interface RigHealthBarProps {
  efficiency: number;
}

export function RigHealthBar({ efficiency }: RigHealthBarProps) {
  const clamped = Math.max(0, Math.min(1, efficiency));
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
      <motion.div
        className="h-full rounded-full bg-dark-breach"
        initial={{ width: 0 }}
        animate={{ width: `${Math.round(clamped * 100)}%` }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
}
