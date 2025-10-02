"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useGameStore } from "@/state/game-store";
import { QueueList } from "@/components/refinery/queue-list";

export default function RefineryPage() {
  const { rigs, refineryJobs, submitRefineryJob } = useGameStore();
  const [rigId, setRigId] = useState<string>(rigs[0]?.id ?? "");
  const [amount, setAmount] = useState<number>(50);

  const selectedRig = useMemo(() => rigs.find((r) => r.id === rigId), [rigId, rigs]);
  const maxAmount = selectedRig?.unrefinedStored ?? 0;
  const disabled = !selectedRig || amount <= 0 || amount > maxAmount;

  const handleSubmit = () => {
    if (!rigId || amount <= 0) return;
    submitRefineryJob(rigId, Math.floor(amount));
    // Reset amount to a sensible default after submission
    setAmount(50);
  };

  return (
    <div className="space-y-10">
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.45em] text-text-tertiary">Refinement Plant</p>
            <h2 className="text-3xl font-display font-semibold text-white">Submit unrefined $CRED for throughput.</h2>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[2fr_3fr]">
          <div className="space-y-6">
            <div className="space-y-4 rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.4em] text-text-tertiary">New Batch</p>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="space-y-2">
                  <span className="text-xs uppercase tracking-[0.3em] text-text-tertiary">Rig</span>
                  <select
                    className="w-full rounded-md border border-white/10 bg-black/50 p-3 text-sm text-text-primary"
                    value={rigId}
                    onChange={(e) => setRigId(e.target.value)}
                  >
                    {rigs.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.id.toUpperCase()} — {r.unrefinedStored} unrefined
                      </option>
                    ))}
                  </select>
                </label>

                <label className="space-y-2">
                  <span className="text-xs uppercase tracking-[0.3em] text-text-tertiary">Amount</span>
                  <input
                    type="number"
                    min={1}
                    max={maxAmount}
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full rounded-md border border-white/10 bg-black/50 p-3 text-sm text-text-primary"
                  />
                  <p className="text-xs text-text-muted">Available: {maxAmount} unrefined</p>
                </label>
              </div>

              <motion.button
                whileTap={{ scale: disabled ? 1 : 0.96 }}
                disabled={disabled}
                onClick={handleSubmit}
                className="focus-ring relative inline-flex items-center justify-center overflow-hidden rounded-md border px-5 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 border-chroma-teal/60 bg-chroma-teal/15 text-chroma-teal hover:bg-chroma-teal/25"
              >
                <span className="absolute inset-0 translate-y-full bg-dark-breach opacity-40 transition-transform duration-500 hover:translate-y-0" />
                <span className="relative z-10">Submit to Refinery</span>
              </motion.button>
            </div>

            <div className="rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.4em] text-text-tertiary">Guidelines</p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-xs text-text-muted">
                <li>Duration scales with amount and rig level.</li>
                <li>Wear recovers while rigs are offline.</li>
                <li>Monitor throughput on the right panel.</li>
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.4em] text-text-tertiary">Throughput Queue</p>
                <span className="text-xs text-text-muted">{refineryJobs.length} batches</span>
              </div>
              <QueueList jobs={refineryJobs} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
