"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Home, ShoppingBag, Cpu, FlaskConical, PiggyBank, ShieldHalf, Landmark, User, Settings } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/broker", label: "Data Broker", icon: ShoppingBag },
  { href: "/rigs", label: "Hack Rigs", icon: Cpu },
  { href: "/refinery", label: "Refinement", icon: FlaskConical },
  { href: "/claims", label: "Claims Vault", icon: PiggyBank },
  { href: "/darkweb", label: "Dark Web", icon: ShieldHalf },
  { href: "/treasury", label: "Treasury", icon: Landmark },
  { href: "/profile", label: "Profile", icon: User },
  { href: "/settings", label: "Settings", icon: Settings },
] as const;

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <aside className="group relative flex w-64 flex-col border-r border-white/5 bg-[rgba(11,15,20,0.7)] backdrop-blur-xl">
      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(15,245,198,0.15),_transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(255,46,136,0.12),_transparent_70%)]" />
      </div>

      <div className="relative z-10 px-6 pb-6 pt-8">
        <p className="text-xs uppercase tracking-[0.45em] text-text-tertiary">Protocol Map</p>
      </div>

      <nav className="relative z-10 flex-1 space-y-2 px-3 pb-8">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname?.startsWith(item.href);
          return (
            <Link key={item.href} href={item.href as any} className="block">
              <div
                className={cn(
                  "relative flex items-center gap-3 overflow-hidden rounded-md border border-transparent px-4 py-3 text-sm transition-all duration-200",
                  isActive
                    ? "border-chroma-teal/60 bg-chroma-teal/20 text-chroma-teal shadow-glow"
                    : "text-text-muted hover:border-white/15 hover:bg-white/5 hover:text-white"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="sidebar-active-glow"
                    className="absolute inset-0 bg-dark-breach opacity-40"
                    transition={{ type: "spring", stiffness: 210, damping: 24 }}
                  />
                )}
                <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-md bg-white/5 text-current">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="relative z-10 font-medium tracking-wide">{item.label}</span>
                <motion.span
                  animate={{ opacity: isActive ? 0.9 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute right-4 top-1/2 h-1 w-1 -translate-y-1/2 rounded-full bg-chroma-teal"
                />
              </div>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
