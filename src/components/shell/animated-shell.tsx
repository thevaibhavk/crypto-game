"use client";

import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { AppHeader } from "@/components/shell/app-header";
import { SidebarNav } from "@/components/shell/sidebar-nav";
import { ReactNode } from "react";

export function AnimatedShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="crt-overlay relative flex min-h-screen bg-background">
      <SidebarNav />
      <div className="flex flex-1 flex-col">
        <AppHeader />
        <div className="relative flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.main
              key={pathname}
              initial={{ opacity: 0, y: 24, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -24, filter: "blur(12px)" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 h-full overflow-auto px-10 pb-20 pt-10"
            >
              {children}
            </motion.main>
          </AnimatePresence>

          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-40 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-dark-breach opacity-20 blur-[140px]" />
            <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-[radial-gradient(circle_at_bottom_right,_rgba(255,46,136,0.35),_transparent_70%)] blur-[120px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
