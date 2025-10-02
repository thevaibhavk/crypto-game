"use client";

import { RefineryJob } from "@/types/game";
import { motion } from "framer-motion";

interface QueueListProps {
  jobs: RefineryJob[];
}

export function QueueList({ jobs }: QueueListProps) {
  return (
    <div className="space-y-3">
      {jobs.length === 0 && (
        <p className="rounded-md border border-dashed border-white/10 p-4 text-sm text-text-tertiary">
          Queue idle. Submit unrefined payloads to amplify throughput.
        </p>
      )}
      {jobs.map((job, index) => {
        const remaining = Math.max(0, new Date(job.etaAt).getTime() - Date.now());
        const remainingMinutes = Math.max(0, Math.round(remaining / 1000 / 60));
        return (
          <motion.div
            key={job.id}
            className="relative overflow-hidden rounded-lg border border-white/10 bg-black/45 p-4"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.35, ease: "easeOut" }}
          >
            <span className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(124,77,255,0.2),_transparent_80%)] opacity-60" />
            <div className="relative z-10 flex items-center justify-between text-sm text-text-muted">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-text-tertiary">Rig {job.rigId}</p>
                <p className="text-white">{job.amountUnrefined} unrefined</p>
              </div>
              <div className="text-right">
                <p className="text-xs uppercase tracking-[0.3em] text-text-tertiary">ETA</p>
                <p className="text-white">{remainingMinutes} min</p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
