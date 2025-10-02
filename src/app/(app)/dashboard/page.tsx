"use client";

import { motion } from "framer-motion";
import { useGameStore } from "@/state/game-store";
import { useMemo } from "react";
import { TrendingUp, TrendingDown, Activity, Zap, ArrowUpRight, ArrowDownRight, AlertTriangle } from "lucide-react";

const cardVariants = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: 0.15 + i * 0.08,
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export default function DashboardPage() {
  const { player, dashboardKpis, rigs, refineryJobs, darkWebAttempts, brokerOffer } = useGameStore();

  const acquisitionStrain = useMemo(() => brokerOffer.strain, [brokerOffer.strain]);

  return (
    <div className="space-y-12">
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.45em] text-text-tertiary">Command Center</p>
            <h2 className="text-3xl font-display font-semibold text-white">
              Syndicate telemetry for {player.address.slice(0, 6)}…
            </h2>
          </div>
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-text-tertiary">
            <span className="flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-2">
              <Activity className="h-3.5 w-3.5" />
              Acquisition Strain {acquisitionStrain.toFixed(2)}x
            </span>
            <span className="flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-2">
              <Zap className="h-3.5 w-3.5" />
              Reputation L{player.reputation}
            </span>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {dashboardKpis.map((kpi, index) => {
            const DeltaIcon =
              kpi.status === "up" ? ArrowUpRight : kpi.status === "down" ? ArrowDownRight : AlertTriangle;
            return (
              <motion.div
                key={kpi.id}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                className="group relative overflow-hidden rounded-lg border border-white/10 bg-[rgba(18,24,38,0.85)] p-6 backdrop-blur"
              >
                <span className="absolute inset-0 translate-y-full bg-dark-breach opacity-35 transition-transform duration-500 group-hover:translate-y-0" />
                <div className="relative z-10 space-y-2">
                  <p className="text-xs uppercase tracking-[0.4em] text-text-tertiary">{kpi.label}</p>
                  <p className="text-3xl font-display text-white">{kpi.value}</p>
                  <p className="flex items-center gap-2 text-xs text-text-muted">
                    <DeltaIcon className="h-3 w-3" />
                    {kpi.delta ?? "Stable"}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <motion.div
          variants={cardVariants}
          custom={1}
          initial="hidden"
          animate="visible"
          className="relative overflow-hidden rounded-lg border border-white/10 bg-white/5 backdrop-blur"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(15,245,198,0.12),_transparent_70%)]" />
          <div className="relative z-10 space-y-4 p-6">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.4em] text-text-tertiary">Active Rigs</p>
              <span className="rounded-full border border-white/10 bg-black/50 px-3 py-1 text-xs text-text-muted">
                {rigs.length} online
              </span>
            </div>
            <div className="space-y-4">
              {rigs.map((rig) => (
                <div key={rig.id} className="space-y-2 rounded-md border border-white/10 bg-black/40 p-4">
                  <div className="flex items-center justify-between">
                    <p className="font-display text-lg text-white">{rig.id.toUpperCase()}</p>
                    <p className="text-xs uppercase tracking-[0.3em] text-text-tertiary">
                      L{rig.level} · Status {rig.status}
                    </p>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-2 rounded-full bg-dark-breach"
                      style={{ width: `${Math.round(rig.baseEfficiency * (1 - rig.wear) * 100)}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs text-text-muted">
                    <span>Unrefined {rig.unrefinedStored} $CRED</span>
                    <span>Wear {(rig.wear * 100).toFixed(1)}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={cardVariants}
          custom={2}
          initial="hidden"
          animate="visible"
          className="relative overflow-hidden rounded-lg border border-white/10 bg-white/5 backdrop-blur"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,46,136,0.12),_transparent_70%)]" />
          <div className="relative z-10 space-y-4 p-6">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.4em] text-text-tertiary">Refinery Queue</p>
              <span className="rounded-full border border-white/10 bg-black/50 px-3 py-1 text-xs text-text-muted">
                {refineryJobs.length} batches
              </span>
            </div>
            <div className="space-y-3">
              {refineryJobs.map((job) => (
                <div key={job.id} className="space-y-2 rounded-md border border-white/10 bg-black/40 p-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white">Rig {job.rigId}</span>
                    <span className="text-text-muted">Level {job.level}</span>
                  </div>
                  <p className="text-xs text-text-muted">{job.amountUnrefined} unrefined → refining</p>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                    <div className="h-1.5 rounded-full bg-chroma-magenta" style={{ width: "58%" }} />
                  </div>
                  <p className="text-xs uppercase tracking-[0.3em] text-text-tertiary">ETA {new Date(job.etaAt).toLocaleTimeString()}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={cardVariants}
          custom={3}
          initial="hidden"
          animate="visible"
          className="relative overflow-hidden rounded-lg border border-white/10 bg-white/5 backdrop-blur"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(124,77,255,0.12),_transparent_70%)]" />
          <div className="relative z-10 space-y-4 p-6">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.4em] text-text-tertiary">Dark Web Layers</p>
              <span className="rounded-full border border-white/10 bg-black/50 px-3 py-1 text-xs text-text-muted">
                {darkWebAttempts.length} logged
              </span>
            </div>
            <div className="space-y-3">
              {darkWebAttempts.map((attempt) => (
                <div key={attempt.id} className="space-y-2 rounded-md border border-white/10 bg-black/40 p-4">
                  <div className="flex items-center justify-between text-sm text-white">
                    <span>Layer {attempt.layer}</span>
                    <span>{attempt.result === "success" ? "Packet captured" : "Firewall bite"}</span>
                  </div>
                  <p className="text-xs text-text-muted">Seed {attempt.seed.slice(0, 8)}…</p>
                  <p className="text-xs text-text-muted">
                    Payout {attempt.payout ? `${attempt.payout} $CRED` : "--"}
                  </p>
                  <p className="font-mono text-[11px] text-text-tertiary">{attempt.serverCommitHash}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
