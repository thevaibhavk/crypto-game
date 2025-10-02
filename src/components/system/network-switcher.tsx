"use client";

import { useMemo } from "react";
import { useSwitchChain, useChainId } from "wagmi";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const CHAINS: Record<number, string> = {
  1: "Ethereum",
  137: "Polygon",
  8453: "Base",
  1101: "Polygon zkEVM",
};

export function NetworkSwitcher() {
  const chainId = useChainId();
  const { chains, switchChain, status, variables } = useSwitchChain();

  const currentLabel = useMemo(() => CHAINS[chainId] ?? `Chain ${chainId}`, [chainId]);

  return (
    <div className="relative">
      <details className="group relative">
        <summary className="focus-ring flex cursor-pointer items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-xs uppercase tracking-[0.35em] text-text-tertiary transition duration-200 hover:border-white/20 hover:text-white">
          <span className="h-2 w-2 rounded-full bg-chroma-teal" />
          {currentLabel}
        </summary>
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          className="absolute right-0 mt-2 w-48 overflow-hidden rounded-md border border-white/10 bg-[rgba(13,18,28,0.95)] backdrop-blur"
        >
          <ul className="divide-y divide-white/5">
            {chains.map((chain) => {
              const pending = status === "pending" && variables?.chainId === chain.id;
              return (
                <li key={chain.id}>
                  <button
                    className={cn(
                      "focus-ring flex w-full items-center justify-between px-4 py-3 text-xs uppercase tracking-[0.3em] transition",
                      chain.id === chainId ? "text-chroma-teal" : "text-text-muted hover:bg-white/5 hover:text-white"
                    )}
                    onClick={() => switchChain({ chainId: chain.id })}
                    disabled={status === "pending" && pending}
                  >
                    {CHAINS[chain.id] ?? chain.name}
                    {pending && <span className="animate-ping text-[10px] text-chroma-teal">...</span>}
                  </button>
                </li>
              );
            })}
          </ul>
        </motion.div>
      </details>
    </div>
  );
}
