"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useGameStore } from "@/state/game-store";
import { RigSlot } from "@/components/rigs/rig-slot";
import { ExploitPack } from "@/types/game";
import { cn } from "@/lib/utils";
import { Wrench, RefreshCcw } from "lucide-react";

export default function RigsPage() {
  const {
    rigs,
    getAvailablePacks,
    deployPackToRig,
    rotateRigOffline,
    refreshRigWear,
  } = useGameStore();
  const [selectedPackId, setSelectedPackId] = useState<string | null>(null);
  const [selectedRigId, setSelectedRigId] = useState<string | null>(null);

  const availablePacks = useMemo(() => getAvailablePacks(), [getAvailablePacks]);

  const handleDeploy = (rigId: string) => {
    if (!selectedPackId) return;
    deployPackToRig(selectedPackId, rigId);
    setSelectedPackId(null);
  };

  const handleRecover = (rigId: string) => {
    rotateRigOffline(rigId);
    setTimeout(() => refreshRigWear(rigId, 90), 1200);
  };

  return (
    <div className="space-y-12">
      <section className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.45em] text-text-tertiary">Hack Rig Control</p>
            <h2 className="text-3xl font-display font-semibold text-white">Manage rigs, wear, and deployment cadence.</h2>
          </div>
          <div className="flex flex-wrap gap-4 text-xs uppercase tracking-[0.3em] text-text-tertiary">
            <span className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">{availablePacks.length} packets ready</span>
            <span className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">{rigs.filter((rig) => rig.status === "offline").length} offline</span>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {availablePacks.map((pack: ExploitPack, index) => (
            <motion.button
              key={pack.id}
              onClick={() => setSelectedPackId(pack.id === selectedPackId ? null : pack.id)}
              className={cn(
                "group relative overflow-hidden rounded-lg border px-4 py-4 text-left text-sm transition",
                pack.id === selectedPackId
                  ? "border-chroma-teal/60 bg-chroma-teal/10 text-chroma-teal shadow-glow"
                  : "border-white/10 bg-white/5 text-text-muted hover:border-white/20 hover:text-white"
              )}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04, duration: 0.35, ease: "easeOut" }}
            >
              <span className="absolute inset-0 translate-y-full bg-dark-breach opacity-40 transition-transform duration-400 group-hover:translate-y-0" />
              <div className="relative z-10 space-y-2">
                <p className="text-xs uppercase tracking-[0.35em] text-text-tertiary">Exploit Pack</p>
                <p className="font-display text-xl text-white">{pack.valueCRED} $CRED</p>
                <p className="font-mono text-[11px] text-text-muted">hash // {pack.id.slice(0, 10)}</p>
                <p className="text-xs text-text-tertiary">Acquired {new Date(pack.acquiredAt).toLocaleTimeString()}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-xs uppercase tracking-[0.45em] text-text-tertiary">Rig Array</p>
          <div className="flex gap-3 text-xs uppercase tracking-[0.3em] text-text-tertiary">
            <span className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
              <Wrench className="h-3.5 w-3.5" /> Deploy packet to rig
            </span>
            <span className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
              <RefreshCcw className="h-3.5 w-3.5" /> Rotate offline to recover
            </span>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {rigs.map((rig, index) => (
            <RigSlot
              key={rig.id}
              rig={rig}
              index={index}
              onDeploy={() => {
                setSelectedRigId(rig.id);
                handleDeploy(rig.id);
              }}
              onRotate={() => handleRecover(rig.id)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
