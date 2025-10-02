"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowUpRight, ArrowDownRight, AlertTriangle } from "lucide-react";

type KPIStatProps = {
  label: string;
  value: string;
  delta?: string;
  status?: "up" | "down" | "neutral";
  index?: number;
};

export function KPIStat({ label, value, delta, status = "neutral", index = 0 }: KPIStatProps) {
  const Icon = status === "up" ? ArrowUpRight : status === "down" ? ArrowDownRight : AlertTriangle;
  const statusClass =
    status === "up" ? "text-chroma-teal" : status === "down" ? "text-chroma-magenta" : "text-text-tertiary";

  return (
    <motion.div
      className="group relative overflow-hidden rounded-lg border border-white/10 bg-[rgba(18,24,38,0.85)] p-6 backdrop-blur"
      initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ delay: 0.15 + index * 0.08, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="absolute inset-0 translate-y-full bg-dark-breach opacity-35 transition-transform duration-500 group-hover:translate-y-0" />
      <div className="relative z-10 space-y-2">
        <p className="text-xs uppercase tracking-[0.4em] text-text-tertiary">{label}</p>
        <p className="text-3xl font-display text-white">{value}</p>
        {delta && (
          <p className={cn("flex items-center gap-2 text-xs", statusClass)}>
            <Icon className="h-3 w-3" />
            {delta}
          </p>
        )}
      </div>
    </motion.div>
  );
}
