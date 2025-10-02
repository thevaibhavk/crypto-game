"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { AudioToggle } from "@/components/system/audio-toggle";
import { SSEStatus } from "@/components/system/sse-status";
import { NetworkSwitcher } from "@/components/system/network-switcher";
import { WalletConnectButton } from "@/components/system/wallet-connect";
import { Bell, Command } from "lucide-react";

const headerVariants = {
  hidden: { opacity: 0, y: -12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

export function AppHeader() {
  return (
    <motion.header
      variants={headerVariants}
      initial="hidden"
      animate="visible"
      className="relative flex h-20 items-center justify-between border-b border-white/5 bg-[rgba(12,16,24,0.75)] px-6 backdrop-blur-xl"
    >
      <div className="flex items-center gap-5">
        <div className="relative">
          <span className="absolute -inset-[2px] rounded-md bg-dark-breach opacity-60 blur-sm" />
          <span className="relative flex h-12 w-12 items-center justify-center rounded-md border border-white/10 bg-black/60 font-mono text-sm uppercase tracking-[0.4em] text-chroma-teal">
            C
          </span>
        </div>
        <div>
          <h1 className="text-lg font-semibold text-white">CRED: Darkware Fidelity</h1>
          <p className="text-xs uppercase tracking-[0.45em] text-text-tertiary">Protocol Status // Trust the shadows</p>
        </div>
      </div>

      <div className="flex items-center gap-4 text-sm text-text-muted">
        <SSEStatus />
        <NetworkSwitcher />
        <AudioToggle />
        <button className="focus-ring relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-md border border-white/10 bg-white/5 transition duration-200 hover:border-white/20 hover:text-white">
          <span className="absolute inset-0 translate-y-full bg-dark-breach opacity-60 transition-transform duration-300 hover:translate-y-0" />
          <Bell className="relative z-10 h-4 w-4" />
        </button>
        <Link
          href="#command"
          className="focus-ring relative flex items-center gap-2 overflow-hidden rounded-md border border-white/10 bg-white/5 px-3 py-2 transition duration-200 hover:border-white/25 hover:text-white"
        >
          <span className="absolute inset-0 translate-y-full bg-chroma-magenta/20 transition-transform duration-300 hover:translate-y-0" />
          <Command className="relative z-10 h-4 w-4" />
          <span className="relative z-10">Command</span>
        </Link>
        <WalletConnectButton />
      </div>
    </motion.header>
  );
}
