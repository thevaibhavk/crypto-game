"use client";

import { motion } from "framer-motion";
import { Rig } from "@/types/game";
import { RigHealthBar } from "@/components/rigs/rig-health-bar";
import { WearBadge } from "@/components/rigs/wear-badge";
import { cn } from "@/lib/utils";

interface RigSlotProps {
  rig: Rig;
  index: number;
  onDeploy?: () => void;
  onRotate?: () => void;
}

export function RigSlot({ rig, index, onDeploy, onRotate }: RigSlotProps) {
  const efficiency = rig.baseEfficiency * rig.systemEffMultiplier * (1 - rig.wear);

  return (
    <motion.div
      className="group relative overflow-hidden rounded-lg border border-white/10 bg-[rgba(15,18,28,0.75)] p-6 backdrop-blur"
      initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ delay: index * 0.05, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="absolute inset-0 translate-y-full bg-dark-breach opacity-30 transition-transform duration-500 group-hover:translate-y-0" />
      <div className="relative z-10 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-text-tertiary">Hack Rig</p>
            <p className="font-display text-2xl text-white">{rig.id.toUpperCase()}</p>
          </div>
          <WearBadge wear={rig.wear} />
        </div>

        <div className="space-y-2">
          <RigHealthBar efficiency={efficiency} />
          <div className="flex items-center justify-between text-xs text-text-muted">
            <span>Effective efficiency {Math.round(efficiency * 100)}%</span>
            <span>Stored {rig.unrefinedStored} unrefined</span>
          </div>
        </div>

        <div className="space-y-2 text-xs text-text-muted">
          <p className="uppercase tracking-[0.3em] text-text-tertiary">Queue</p>
          {rig.queue.length === 0 ? (
            <p className="rounded-md border border-dashed border-white/10 p-3 text-text-tertiary">
              No packets queued.
            </p>
          ) : (
            <ul className="grid gap-2 text-[11px] font-mono">
              {rig.queue.map((pack) => (
                <li key={pack.id} className="rounded-md border border-white/10 bg-black/40 px-3 py-2">
                  {pack.valueCRED} $CRED · {new Date(pack.acquiredAt).toLocaleTimeString()}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={onDeploy}
            className={cn(
              "focus-ring relative overflow-hidden rounded-md border px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] transition",
              "border-chroma-teal/50 bg-chroma-teal/15 text-chroma-teal hover:border-chroma-teal/70 hover:bg-chroma-teal/25"
            )}
          >
            Deploy Packet
          </button>
          <button
            onClick={onRotate}
            className="focus-ring relative overflow-hidden rounded-md border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-text-muted transition hover:border-white/25 hover:text-white"
          >
            Rotate Offline
          </button>
          <span className="text-xs uppercase tracking-[0.3em] text-text-tertiary">
            Status {rig.status}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
