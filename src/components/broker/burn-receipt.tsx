"use client";

import { motion } from "framer-motion";

interface BurnReceiptProps {
  fee: number;
  timestamp: string;
  hash: string;
}

export function BurnReceipt({ fee, timestamp, hash }: BurnReceiptProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-lg border border-chroma-magenta/40 bg-[rgba(40,14,28,0.8)] p-5 text-sm text-text-muted"
    >
      <p className="text-xs uppercase tracking-[0.4em] text-chroma-magenta">Burn Receipt</p>
      <p className="mt-2 text-lg font-semibold text-white">{fee} $CRED burned</p>
      <p className="font-mono text-[11px] text-text-tertiary">tx // {hash}</p>
      <p className="text-xs text-text-muted">{new Date(timestamp).toLocaleString()}</p>
    </motion.div>
  );
}
