"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useGameStore } from "@/state/game-store";

function randomHex(len = 32) {
  const arr = new Uint8Array(len / 2);
  crypto.getRandomValues(arr);
  return "0x" + Array.from(arr).map((b) => b.toString(16).padStart(2, "0")).join("");
}

export default function DarkWebPage() {
  const { darkWebAttempts, addDarkWebAttempt } = useGameStore();
  const [layer, setLayer] = useState<number>(3);
  const [amount, setAmount] = useState<number>(100);
  const [pending, setPending] = useState(false);

  const handleAttempt = async () => {
    if (pending || amount <= 0) return;
    setPending(true);

    const success = Math.random() > 0.5 - Math.min(0.3, layer * 0.03);
    const payout = success ? Math.round(amount * (1.1 + layer * 0.15)) : undefined;

    addDarkWebAttempt({
      id: crypto.randomUUID(),
      layer,
      amount,
      seed: crypto.randomUUID(),
      serverCommitHash: randomHex(64),
      result: success ? "success" : "fail",
      payout,
      resolvedAt: new Date().toISOString(),
    });

    setPending(false);
  };

  return (
    <div className="space-y-10">
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.45em] text-text-tertiary">Dark Web Layers</p>
            <h2 className="text-3xl font-display font-semibold text-white">Risk it for amplified yield.</h2>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[2fr_3fr]">
          <div className="space-y-6">
            <div className="space-y-4 rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.4em] text-text-tertiary">New Attempt</p>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="space-y-2">
                  <span className="text-xs uppercase tracking-[0.3em] text-text-tertiary">Layer</span>
                  <select
                    className="w-full rounded-md border border-white/10 bg-black/50 p-3 text-sm text-text-primary"
                    value={layer}
                    onChange={(e) => setLayer(Number(e.target.value))}
                  >
                    {[1, 2, 3, 4, 5].map((l) => (
                      <option key={l} value={l}>
                        Layer {l}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="space-y-2">
                  <span className="text-xs uppercase tracking-[0.3em] text-text-tertiary">Amount ($CRED)</span>
                  <input
                    type="number"
                    min={1}
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full rounded-md border border-white/10 bg-black/50 p-3 text-sm text-text-primary"
                  />
                </label>
              </div>

              <motion.button
                whileTap={{ scale: pending ? 1 : 0.96 }}
                disabled={pending || amount <= 0}
                onClick={handleAttempt}
                className="focus-ring relative inline-flex items-center justify-center overflow-hidden rounded-md border px-5 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 border-chroma-magenta/60 bg-chroma-magenta/15 text-chroma-magenta hover:bg-chroma-magenta/25"
              >
                <span className="absolute inset-0 translate-y-full bg-dark-breach opacity-40 transition-transform duration-500 hover:translate-y-0" />
                <span className="relative z-10">Initiate Breach</span>
              </motion.button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.4em] text-text-tertiary">Recent Attempts</p>
                <span className="text-xs text-text-muted">{darkWebAttempts.length} logged</span>
              </div>
              <div className="space-y-3">
                {darkWebAttempts.map((a) => (
                  <div key={a.id} className="rounded-md border border-white/10 bg-black/40 p-4">
                    <div className="flex items-center justify-between text-sm text-white">
                      <span>Layer {a.layer}</span>
                      <span>{a.result === "success" ? "Packet captured" : "Firewall bite"}</span>
                    </div>
                    <p className="text-xs text-text-muted">Amount {a.amount} $CRED</p>
                    <p className="text-xs text-text-muted">Seed {a.seed.slice(0, 8)}…</p>
                    {a.payout ? (
                      <p className="text-xs text-chroma-teal">Payout {a.payout} $CRED</p>
                    ) : (
                      <p className="text-xs text-text-muted">No payout</p>
                    )}
                    <p className="font-mono text-[11px] text-text-tertiary">{a.serverCommitHash}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
