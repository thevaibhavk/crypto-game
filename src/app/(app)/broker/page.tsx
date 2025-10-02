"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useGameStore } from "@/state/game-store";
import { ExploitPackCard } from "@/components/broker/exploit-pack-card";
import { BrokerRoll } from "@/components/broker/broker-roll";
import { ReputationMeter } from "@/components/broker/reputation-meter";
import { BurnReceipt } from "@/components/broker/burn-receipt";
import { ExploitPack, BrokerOffer } from "@/types/game";
import { systemEfficiencyMultiplier } from "@/lib/formulas";
import { RocketIcon } from "lucide-react";

export default function BrokerPage() {
  const {
    brokerOffer,
    exploitPacks,
    purchaseExploitPack,
    player,
    systemOrderCount,
    upgradeReputation,
  } = useGameStore();

  const [selectedPack, setSelectedPack] = useState<ExploitPack | undefined>();
  const [rolling, setRolling] = useState(false);
  const [burnReceipt, setBurnReceipt] = useState<{ fee: number; timestamp: string; hash: string } | null>(null);

  const offerGradient = useMemo(
    () => `linear-gradient(135deg, rgba(15,245,198,0.25), rgba(124,77,255,0.24), rgba(255,46,136,0.25))`,
    []
  );

  const handleRoll = () => {
    if (rolling) return;
    const pack: ExploitPack = {
      id: crypto.randomUUID(),
      valueCRED: Math.round(
        brokerOffer.min + Math.random() * (brokerOffer.max - brokerOffer.min) * (1 + player.reputation * brokerOffer.reputationWeight)
      ),
      acquiredAt: new Date().toISOString(),
      source: "broker",
    };
    setSelectedPack(pack);
    setRolling(true);
    setBurnReceipt(null);
  };

  const handleRollComplete = () => {
    if (!selectedPack) return;
    const nextOffer: BrokerOffer = {
      baseValue: 50,
      min: brokerOffer.min,
      max: brokerOffer.max,
      reputationWeight: brokerOffer.reputationWeight,
      strain: systemEfficiencyMultiplier(systemOrderCount + 1),
      timestamp: new Date().toISOString(),
    };
    purchaseExploitPack(selectedPack, nextOffer);
    setBurnReceipt({
      fee: 5,
      timestamp: new Date().toISOString(),
      hash: crypto.randomUUID().replace(/-/g, "").slice(0, 16),
    });
    setRolling(false);
  };

  return (
    <div className="space-y-12">
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.45em] text-text-tertiary">Underground Data Broker</p>
            <h2 className="text-3xl font-display font-semibold text-white">Pull exploit packs and fuel your rigs.</h2>
          </div>
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={handleRoll}
            className="focus-ring group relative flex items-center gap-3 overflow-hidden rounded-capsule border border-chroma-teal/60 bg-chroma-teal/15 px-6 py-3 text-sm font-semibold text-chroma-teal transition duration-300"
          >
            <span className="absolute inset-0 translate-y-full bg-dark-breach opacity-50 transition-transform duration-500 group-hover:translate-y-0" />
            <RocketIcon className="relative z-10 h-4 w-4" />
            <span className="relative z-10">Initiate Broker Pull</span>
          </motion.button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[2fr_3fr]">
          <div className="space-y-6">
            <div className="rounded-lg border border-white/10 p-6" style={{ backgroundImage: offerGradient }}>
              <p className="text-xs uppercase tracking-[0.4em] text-text-tertiary">Current Offer Window</p>
              <div className="mt-4 flex flex-wrap gap-6 text-sm text-text-muted">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-text-tertiary">Base</p>
                  <p className="text-lg font-display text-white">{brokerOffer.baseValue} $CRED</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-text-tertiary">Range</p>
                  <p className="text-lg font-display text-white">
                    {brokerOffer.min} – {brokerOffer.max} $CRED
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-text-tertiary">Efficiency</p>
                  <p className="text-lg font-display text-white">×{brokerOffer.strain.toFixed(2)}</p>
                </div>
              </div>
            </div>

            <ReputationMeter level={player.reputation} />

            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={upgradeReputation}
              className="focus-ring relative overflow-hidden rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-text-muted transition duration-300 hover:border-white/25 hover:text-white"
            >
              <span className="absolute inset-0 translate-y-full bg-[linear-gradient(120deg,rgba(255,46,136,0.35),rgba(15,245,198,0.35))] opacity-70 transition-transform duration-500 hover:translate-y-0" />
              <span className="relative z-10">
                Spend 150 $CRED to permanently bias higher-value packets.
              </span>
            </motion.button>

            {burnReceipt && (
              <BurnReceipt fee={burnReceipt.fee} timestamp={burnReceipt.timestamp} hash={burnReceipt.hash} />
            )}
          </div>

          <div className="space-y-6">
            <BrokerRoll selectedPack={selectedPack} rolling={rolling} onRollComplete={handleRollComplete} />

            <div className="rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur">
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.4em] text-text-tertiary">Recent Pulls</p>
                <span className="text-xs text-text-muted">{exploitPacks.length} stored</span>
              </div>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {exploitPacks.slice(0, 4).map((pack, idx) => (
                  <ExploitPackCard key={pack.id} pack={pack} index={idx} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
