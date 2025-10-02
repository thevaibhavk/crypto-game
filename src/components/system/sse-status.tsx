"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function SSEStatus() {
  const [connected, setConnected] = useState(true);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setConnected((prev) => !prev);
    }, 12000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="relative flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-xs uppercase tracking-[0.35em] text-text-tertiary"
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <motion.span
        className="h-2 w-2 rounded-full"
        animate={{
          scale: connected ? [1, 1.3, 1] : 1,
          opacity: connected ? [0.7, 1, 0.7] : 0.35,
        }}
        transition={{ repeat: connected ? Infinity : 0, duration: 1.2, ease: "easeInOut" }}
        style={{
          background: connected ? "#0FF5C6" : "#FF3B3B",
          boxShadow: connected ? "0 0 12px rgba(15,245,198,0.65)" : "0 0 8px rgba(255,59,59,0.45)",
        }}
      />
      <span>{connected ? "Packet captured" : "Firewall bite"}</span>
    </motion.div>
  );
}
