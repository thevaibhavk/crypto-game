"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { ExploitPack } from "@/types/game";
import { cn } from "@/lib/utils";

interface BrokerRollProps {
  selectedPack?: ExploitPack;
  rolling: boolean;
  onRollComplete?: () => void;
}

const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

export function BrokerRoll({ selectedPack, rolling, onRollComplete }: BrokerRollProps) {
  const [counter, setCounter] = useState(() => Math.floor(Math.random() * 1000));

  useEffect(() => {
    if (!rolling) return;
    const interval = window.setInterval(() => {
      setCounter((prev) => (prev + 7) % 10000);
    }, 50);
    const timeout = window.setTimeout(() => {
      window.clearInterval(interval);
      onRollComplete?.();
    }, 2400);
    return () => {
      window.clearInterval(interval);
      window.clearTimeout(timeout);
    };
  }, [rolling, onRollComplete]);

  const counterDigits = useMemo(() => counter.toString().padStart(4, "0").split(""), [counter]);

  return (
    <div className="relative overflow-hidden rounded-lg border border-white/10 bg-black/50 p-6 backdrop-blur">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,46,136,0.25),_transparent_70%)] opacity-60" />
      <div className="relative z-10 space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-xs uppercase tracking-[0.4em] text-text-tertiary">Broker Roll</p>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-text-muted">
            {rolling ? "Sequencing" : "Awaiting input"}
          </span>
        </div>

        <div className="flex items-center justify-center gap-3">
          {counterDigits.map((digit, idx) => (
            <motion.div
              key={idx}
              className={cn(
                "flex h-16 w-12 items-center justify-center rounded-md border border-white/10 bg-black/70 text-2xl font-mono text-chroma-teal",
                rolling && "shadow-[0_0_16px_rgba(15,245,198,0.45)]"
              )}
              animate={{
                opacity: rolling ? [0.6, 1, 0.6] : 1,
                y: rolling ? [0, -6, 0] : 0,
              }}
              transition={{ repeat: rolling ? Infinity : 0, duration: 0.6, ease: "easeInOut" }}
            >
              {digit}
            </motion.div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {selectedPack ? (
            <motion.div
              key={selectedPack.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-md border border-white/10 bg-white/5 p-4 text-sm text-text-muted"
            >
              <p className="text-xs uppercase tracking-[0.35em] text-text-tertiary">Output</p>
              <p className="font-display text-lg text-white">{selectedPack.valueCRED} $CRED Packet Captured</p>
              <p className="font-mono text-[11px]">hash // {selectedPack.id}</p>
            </motion.div>
          ) : (
            <motion.div
              key="placeholder"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="rounded-md border border-dashed border-white/10 p-4 text-sm text-text-muted"
            >
              Awaiting broker pull. Provide a seed to breach the packet lane.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
