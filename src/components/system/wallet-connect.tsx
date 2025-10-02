"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { motion } from "framer-motion";

export function WalletConnectButton() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-md border border-white/10 bg-white/5 px-2 py-1"
    >
      <ConnectButton
        accountStatus="address"
        chainStatus="icon"
        showBalance={{ smallScreen: false, largeScreen: true }}
        label="Jack In"
      />
    </motion.div>
  );
}
