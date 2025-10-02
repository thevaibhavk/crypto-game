import type { Metadata } from "next";
import { AnimatedShell } from "@/components/shell/animated-shell";

export const metadata: Metadata = {
  title: "CRED: Darkware Fidelity Terminal",
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <AnimatedShell>{children}</AnimatedShell>;
}
