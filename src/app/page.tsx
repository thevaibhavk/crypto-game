"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

const slides = [
  {
    id: "depth",
    title: "Breach the Depth",
    subtitle: "You\'re breaching the Depth. Trust the shadows.",
    content: "Step into a neon-dark syndicate where $CRED rules the underground economy.",
  },
  {
    id: "forge",
    title: "Forge Your Rigs",
    subtitle: "Packet captured.",
    content: "Deploy exploit packs, assign hackers, and squeeze every fragment of unrefined $CRED.",
  },
  {
    id: "syndicate",
    title: "Syndicate Ascension",
    subtitle: "Trace diverted.",
    content: "Risk it all on Dark Web layers powered by provable RNG. Firewall bite or infinite yield?",
  },
];

const slideVariants = {
  enter: { opacity: 0, filter: "blur(12px)", y: 40 },
  center: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    filter: "blur(12px)",
    y: -40,
    transition: { duration: 0.45, ease: [0.7, 0, 0.84, 0] },
  },
};

export default function LandingPage() {
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-background via-surface to-background">
      <div className="absolute inset-0 opacity-[0.25]">
        <div className="absolute -left-20 top-10 h-[520px] w-[520px] rounded-full bg-dark-breach blur-[140px]" />
        <div className="absolute right-0 bottom-0 h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle_at_top,_rgba(255,46,136,0.65),_transparent)] blur-[120px]" />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,#0FF5C6_0%,transparent_65%)] opacity-10" />

      <div className="crt-overlay relative z-[2] flex min-h-screen flex-col">
        <header className="flex items-center justify-between px-8 py-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex items-center gap-3"
          >
            <span className="h-10 w-10 rounded-lg border border-white/15 bg-black/50 backdrop-blur-sm" />
            <div>
              <p className="text-xs uppercase tracking-[0.5em] text-text-muted">Protocol</p>
              <p className="text-lg font-semibold text-text-primary">CRED: The Darkware Fidelity</p>
            </div>
          </motion.div>

          <motion.nav
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex items-center gap-6"
          >
            <button className="focus-ring relative overflow-hidden rounded-capsule border border-white/10 px-5 py-2 text-sm text-text-muted transition-all duration-200 hover:border-white/30 hover:text-text-primary">
              <span className="absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-200 hover:opacity-100" />
              Docs
            </button>
            <Link
              href="/dashboard"
              className="focus-ring relative overflow-hidden rounded-capsule border border-chroma-teal/50 bg-chroma-teal/20 px-6 py-2 text-sm font-semibold text-chroma-teal shadow-glow transition-all duration-200 hover:bg-chroma-teal/30"
            >
              Launch Interface
            </Link>
          </motion.nav>
        </header>

        <main className="relative z-[3] flex flex-1 flex-col gap-12 px-8 py-12 lg:flex-row lg:items-center lg:justify-between lg:px-16">
          <div className="max-w-xl space-y-10">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: "easeOut" }}
              className="text-5xl font-display font-semibold leading-tight text-white drop-shadow-[0_0_32px_rgba(15,245,198,0.45)]"
            >
              Neon-bathed syndicate strategy for the underground elite.
            </motion.h1>

            <p className="max-w-lg text-lg text-text-muted">
              Jack into the Darkware fidelity suite. Deploy rigs, refine $CRED, and breach the syndicate\'s deepest vaults with provable fairness.
            </p>

            <div className="flex flex-wrap gap-4 text-sm text-text-muted">
              <div className="flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
                <span className="h-2 w-2 animate-ping rounded-full bg-chroma-teal" />
                Live SSE telemetry
              </div>
              <div className="flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
                <span className="h-2 w-2 animate-[pulse_1.3s_cubic-bezier(.4,0,.6,1)_infinite] rounded-full bg-chroma-magenta" />
                Provable RNG
              </div>
              <div className="flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
                <span className="h-2 w-2 animate-hack-pulse rounded-full bg-chroma-violet" />
                Polygon / Base ready
              </div>
            </div>

            <div className="flex flex-col gap-3 text-sm text-text-muted">
              <span className="text-xs uppercase tracking-[0.35em] text-text-tertiary">Tutorial Path</span>
              <div className="flex flex-wrap items-center gap-3">
                {slides.map((slide, index) => (
                  <button
                    key={slide.id}
                    onClick={() => setActiveSlide(index)}
                    className={cn(
                      "group relative overflow-hidden rounded-md border px-4 py-2 transition-all duration-200",
                      activeSlide === index
                        ? "border-chroma-teal/70 bg-chroma-teal/20 text-chroma-teal shadow-glow"
                        : "border-white/10 bg-white/5 text-text-muted hover:border-white/25 hover:text-white"
                    )}
                  >
                    <span className="absolute inset-0 translate-y-full bg-dark-breach opacity-70 transition-transform duration-300 group-hover:translate-y-0" />
                    <span className="relative z-10 font-medium tracking-wide">
                      {index + 1}. {slide.title}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="relative flex w-full max-w-xl flex-col gap-6">
            <div className="pointer-events-none absolute -top-12 right-8 h-28 w-28 animate-[spin_14s_linear_infinite] rounded-full border border-chroma-teal/40" />
            <div className="pointer-events-none absolute -bottom-12 left-0 h-24 w-24 animate-[spin_9s_linear_infinite] rounded-full border border-chroma-magenta/40" />

            <div className="relative overflow-hidden rounded-lg border border-white/10 bg-panel/60 p-[1px] shadow-[0_0_42px_rgba(15,245,198,0.25)] backdrop-blur">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(124,77,255,0.3),_transparent_65%)]" />
              <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,46,136,0.15),rgba(15,245,198,0.05))] mix-blend-screen" />

              <div className="relative min-h-[320px] overflow-hidden rounded-lg p-8">
                <AnimatePresence mode="wait">
                  <motion.div key={slides[activeSlide].id} variants={slideVariants} initial="enter" animate="center" exit="exit" className="space-y-6">
                    <p className="text-sm uppercase tracking-[0.4em] text-text-tertiary">Protocol Feed</p>
                    <h2 className="text-3xl font-display font-semibold text-white">
                      {slides[activeSlide].title}
                    </h2>
                    <p className="text-text-muted">{slides[activeSlide].content}</p>
                    <div className="rounded-md border border-white/10 bg-black/40 p-4 font-mono text-xs text-text-muted">
                      <p>// {slides[activeSlide].subtitle}</p>
                      <p>const seed = crypto.randomUUID()</p>
                      <p>runPacket(seed)</p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
                className="group relative overflow-hidden rounded-lg border border-white/10 bg-white/5 p-5 backdrop-blur"
              >
                <span className="absolute inset-0 translate-y-full bg-chroma-teal/15 transition-transform duration-300 group-hover:translate-y-0" />
                <div className="relative z-10 space-y-2">
                  <p className="text-xs uppercase tracking-[0.4em] text-text-tertiary">Secure RNG</p>
                  <p className="text-lg font-semibold text-white">Provable fairness pipeline</p>
                  <p className="text-xs text-text-muted">
                    Client seed + server commitment hash. Verify every dark web breach.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
                className="group relative overflow-hidden rounded-lg border border-white/10 bg-white/5 p-5 backdrop-blur"
              >
                <span className="absolute inset-0 translate-y-full bg-chroma-magenta/15 transition-transform duration-300 group-hover:translate-y-0" />
                <div className="relative z-10 space-y-2">
                  <p className="text-xs uppercase tracking-[0.4em] text-text-tertiary">Real-time Pulse</p>
                  <p className="text-lg font-semibold text-white">SSE chipset linked</p>
                  <p className="text-xs text-text-muted">
                    Stream rig wear, refinery queues, and dark web attempts as they propagate.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </main>

        <footer className="z-[3] flex items-center justify-between px-8 pb-8">
          <span className="text-xs uppercase tracking-[0.3em] text-text-tertiary">© 2088 Darkware Fidelity Syndicate</span>
          <div className="flex items-center gap-4 text-xs text-text-muted">
            <button className="focus-ring relative overflow-hidden rounded-capsule border border-white/10 px-4 py-1.5 transition duration-200 hover:border-white/25 hover:text-white">
              Accessibility
            </button>
            <button className="focus-ring relative overflow-hidden rounded-capsule border border-white/10 px-4 py-1.5 transition duration-200 hover:border-white/25 hover:text-white">
              Locale: EN
            </button>
          </div>
        </footer>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-10 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
          className="flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-4 py-2 text-xs uppercase tracking-[0.3em] text-text-tertiary backdrop-blur"
        >
          Scroll to breach
          <motion.span
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="h-2 w-2 rounded-full bg-chroma-teal"
          />
        </motion.div>
      </div>
    </div>
  );
}
