"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { useGameStore } from "@/state/game-store";

export default function ClaimsPage() {
  const { claimCycle, updateClaimCycle, recalcKPIs } = useGameStore();

  const canClaim = (claimCycle?.refinedAvailable ?? 0) > 0;
  const nextClaimPreview = useMemo(() => {
    const avail = claimCycle?.refinedAvailable ?? 0;
    return Math.round(avail);
  }, [claimCycle?.refinedAvailable]);

  const handleClaimAll = () => {
    if (!canClaim) return;
    const now = new Date().toISOString();
    updateClaimCycle({
      ...claimCycle,
      refinedAvailable: 0,
      lastClaimAt: now,
    });
    recalcKPIs();
  };

  return (
    <div className="space-y-10">
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.45em] text-text-tertiary">Claims Vault</p>
            <h2 className="text-3xl font-display font-semibold text-white">Settle refined $CRED into your wallet.</h2>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[2fr_3fr]">
          <div className="space-y-6">
            <div className="rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur">
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.4em] text-text-tertiary">Current Cycle</p>
                <span className="text-xs text-text-muted">started {new Date(claimCycle.cycleStartAt).toLocaleDateString()}</span>
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="rounded-md border border-white/10 bg-black/40 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-text-tertiary">Refined Available</p>
                  <p className="text-2xl font-display text-white">{Math.round(claimCycle.refinedAvailable)} $CRED</p>
                </div>
                <div className="rounded-md border border-white/10 bg-black/40 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-text-tertiary">Last Claim</p>
                  <p className="text-2xl font-display text-white">
                    {claimCycle.lastClaimAt ? new Date(claimCycle.lastClaimAt).toLocaleString() : "--"}
                  </p>
                </div>
              </div>

              <motion.button
                whileTap={{ scale: canClaim ? 0.96 : 1 }}
                disabled={!canClaim}
                onClick={handleClaimAll}
                className="mt-4 focus-ring relative inline-flex items-center justify-center overflow-hidden rounded-md border px-6 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 border-chroma-teal/60 bg-chroma-teal/15 text-chroma-teal hover:bg-chroma-teal/25"
              >
                <span className="absolute inset-0 translate-y-full bg-dark-breach opacity-40 transition-transform duration-500 hover:translate-y-0" />
                <span className="relative z-10">Claim All ({nextClaimPreview} $CRED)</span>
              </motion.button>
            </div>

            <div className="rounded-lg border border-white/10 bg-white/5 p-6 text-sm text-text-muted backdrop-blur">
              <p className="text-xs uppercase tracking-[0.4em] text-text-tertiary">Notes</p>
              <ul className="mt-3 list-disc space-y-1 pl-5">
                <li>Claim resets the refined balance to 0.</li>
                <li>New refined output flows in from refinery as jobs complete.</li>
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.4em] text-text-tertiary">Ledger</p>
              <div className="mt-3 space-y-2 text-xs text-text-muted">
                <p>Cycle started: {new Date(claimCycle.cycleStartAt).toLocaleString()}</p>
                <p>Last claim: {claimCycle.lastClaimAt ? new Date(claimCycle.lastClaimAt).toLocaleString() : "--"}</p>
                <p>Pending refined: {Math.round(claimCycle.refinedAvailable)} $CRED</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
