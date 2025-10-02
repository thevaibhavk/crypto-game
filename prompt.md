# Frontend Agent Super-Prompt: CRED — The Darkware Fidelity

You are a senior front-end/game UX engineer tasked to deliver an end-to-end UI/UX, component system, and game client for a cyberpunk P2E strategy game. The tone blends neon-dark hacker aesthetics with gritty underground economy vibes (inspired by Narcos Industry GitBook’s high-stakes P2E energy), while the mechanics follow the provided litepaper.

Deliver a production-quality, aesthetically stunning, responsive, and accessible interface that players remember for years.

---

## Objectives
- **[Goal]** Build the full game client for “CRED: The Darkware Fidelity”.
- **[Scope]** Design system + IA + flows + components + animations + sounds + data contracts + state machines + test stories.
- **[Platforms]** Desktop-first, responsive to mobile.
- **[Integrations]** EVM wallet (e.g., Polygon/Base), real-time updates, secure RNG results for risk layers.
- **[Performance]** Lighthouse 90+, FCP < 1.5s on mid-tier devices.

---

## Aesthetic & Brand Direction
- **[Theme]** Neon terminal x darkware cybernetics. Gritty, high-fidelity UI chrome with glitch microinteractions.
- **[Palette]**
  - Core: `#0A0E14` (Darkware Black), `#0FF5C6` (Neon Teal), `#FF2E88` (Hot Magenta), `#7C4DFF` (Electric Violet)
  - Accents: `#FFD166` (Alert Amber), `#B0FF00` (Acid Lime), `#FF3B3B` (Danger Red)
  - Neutrals: `#0B0F14`, `#121826`, `#1B2330`, `#98A2B3`
  - Gradients: “Dark Breach” = linear 135° `#0FF5C6 → #7C4DFF → #FF2E88`
- **[Typography]**  
  Display: Space Grotesk (700/600)  
  Body: Inter (400/500/600)  
  Mono: JetBrains Mono for code/terminals.
- **[Visual Motifs]** CRT scanlines (subtle), chromatic aberration on hovers, terminal cursor blinks, noise overlays at 3–5% opacity.
- **[Motion]**
  - 120–200ms ease-out for taps.
  - Staggered list reveals with 30ms offsets.
  - “Hack Pulse” halo on critical counters (0.8–1.0s pulsing).
  - “Packet Transfer” beam effect when sending $CRED to refinery/dark web.
- **[Audio]** Minimal glitch clicks, subdued synth whooshes on success, distorted static on failure. Mute toggle persists.

---

## Information Architecture (Pages/Views)
- **[Landing/Onboarding]** Lore slideshow → Connect Wallet → Create Profile → Tutorial steps (Broker → Rigs → Refinement → Claim → Dark Web).
- **[Dashboard]**
  - Top KPIs: Wallet $CRED, Unrefined in Rigs, Refinery Queue, Claimable, Risk Ledger.
  - Widgets: Broker Offers, Active Rigs, Refinery status, Claim Maturity, Dark Web Layers quick actions.
- **[Underground Data Broker]**
  - Buy Exploit Packs: First buy fixed 50 $CRED value. Subsequent buys random [20..50].
  - Reputation Upgrades: Permanent level boosts probability of higher-value packs.
  - Fee: 5 $CRED burned per order.
- **[Hack Rigs]**
  - Up to 6 rigs. Deploy Exploit Packs → mine raw (unrefined) $CRED.
  - Assign AI Agents/Hackers to boost performance.
  - Show system-wide Acquisition Strain and per-rig Operational Wear.
  - Actions: Rotate offline for recovery, Maintenance Entities, Hardware Upgrades.
- **[Refinement Center]**
  - Convert unrefined → refined $CRED. Center level ties to rig level for throughput.
  - Queue visualization, ETA, throughput sliders (if applicable), capacity limits.
- **[Claims Vault]**
  - 7-day maturity curve. Day 1: 70% → Day 7: 100% → claiming resets cycle.
  - Early claim tax proportional to unmatured portion; tax returns to community pool.
- **[Dark Web Syndicate]**
  - Multi-layer risk transfers with lore, success rates, reward multipliers.
  - One-click attempts with provable RNG result + animation.
- **[Treasury/Market]**
  - Community pool, burn logs, token sinks, overall economy telemetry.
- **[Profile/Inventory]**
  - Owned Exploit Packs, Agents/Hackers, Upgrades, Reputation level, History.
- **[Settings]**
  - Theme, Audio, Performance, Language, Accessibility, Network selection.

---

## Core Mechanics (UI-level Formulas)
Implement UI preview/estimates; authoritative resolution happens server-side.

### Broker Orders
```ts
// First Pack: value = 50 $CRED, feeBurn = 5.
// Subsequent Packs: value ∈ [20..50], feeBurn = 5.
// Reputation shifts probability density toward higher values.
Acquisition Strain (System-wide)
ts
Copy code
function systemEfficiencyMultiplier(orderCount: number): number {
  if (orderCount <= 1) return 1;
  const steps = orderCount - 1;
  const raw = Math.pow(0.96, steps);
  const clamped = Math.max(0.05, raw);
  return steps >= 59 ? 0.05 : clamped; // cap by ~60th order as per spec
}
Operational Wear (Per Rig)
ts
Copy code
function wearDelta(minutesOnline: number, wearRate=0.002): number {
  return Math.min(0.3, 1 - Math.exp(-wearRate * minutesOnline)); // cap 30%
}
function recoveryDelta(minutesOffline: number, recoveryRate=0.01): number {
  return Math.min(1, 1 - Math.exp(-recoveryRate * minutesOffline));
}
// effectiveRigEff = baseEff * systemEff * (1 - wear)
Refinement Claim Maturity
ts
Copy code
function maturityPercent(daysSinceRefineStart: number): number {
  return Math.min(1, 0.7 + 0.05 * Math.max(0, Math.floor(daysSinceRefineStart)-1));
}
function earlyClaimTax(maturity: number): number { return 1 - maturity; }
Dark Web Layers
json
Copy code
{
  "layers": [
    {"id":1,"name":"Surface Shadow Net","success":0.95,"multiplier":1.0421},
    {"id":2,"name":"Mid-Tier Maze","success":0.80,"multiplier":1.2375},
    {"id":3,"name":"Great Void Firewall","success":0.70,"multiplier":1.4143},
    {"id":4,"name":"Phantom Protocol","success":0.60,"multiplier":1.65},
    {"id":5,"name":"Outback Abyss","success":0.495,"multiplier":2.0},
    {"id":6,"name":"Monsoon Cipher Vault","success":0.45,"multiplier":2.2},
    {"id":7,"name":"Gallic Encryption Depths","success":0.35,"multiplier":2.8286},
    {"id":8,"name":"Mafia Data Crypt","success":0.25,"multiplier":3.96},
    {"id":9,"name":"Red Star Black Hole","success":0.15,"multiplier":6.6},
    {"id":10,"name":"Eagle Eye Void","success":0.10,"multiplier":9.9},
    {"id":11,"name":"Hermit Kingdom Purge","success":0.05,"multiplier":19.8}
  ]
}
Component System
[Tech] Next.js 14, React 18, Tailwind, Radix UI, shadcn/ui, Framer Motion, Wagmi, Viem, RainbowKit

[Design Tokens] Color roles, typography scale, radius (6/10/14), elevation (glass + glow), spacing scale 4/8/12/16…

[Core Components]

Shell: AppHeader, SidebarNav, KPIStat, GlitchCard, TerminalPanel, GlassModal, BeamTransfer

Broker: ExploitPackCard, BrokerRoll, ReputationMeter, BurnReceipt

Rigs: RigSlot, RigHealthBar, WearBadge, AgentAssign, UpgradeTile, MaintenanceAction

Refinery: QueueList, ThroughputMeter, RefineProgress, CapacityBar

Claims: MaturityDial, ClaimButton, TaxCalculator

Dark Web: LayerCard, RiskSlider, AttemptResult, ProvableHashBadge

Economy: PoolGauge, BurnLogList, LedgerTable

System: WalletConnect, NetworkSwitcher, ToastBus, SSEStatus, AudioToggle

State & Data Models (TypeScript)
ts
Copy code
type ReputationLevel = 0|1|2|3|4|5;

type ExploitPack = {
  id: string;
  valueCRED: number; // 50 for first; 20..50 thereafter
  acquiredAt: string;
  source: "broker";
};

type Rig = {
  id: string;
  level: number;
  baseEfficiency: number;     // 0..1
  systemEffMultiplier: number; // global
  wear: number;               // 0..0.3
  assignedAgents: string[];   // agent IDs
  status: "idle"|"mining"|"offline"|"maintenance";
  queue: ExploitPack[];
  unrefinedStored: number;
};

type RefineryJob = {
  id: string;
  rigId: string;
  amountUnrefined: number;
  startedAt: string;
  etaAt: string;
  level: number;
};

type ClaimCycle = {
  refinedAvailable: number;
  cycleStartAt: string;
  lastClaimAt?: string;
};

type DarkWebAttempt = {
  id: string;
  layer: number;
  amount: number;
  seed: string; // client
  serverCommitHash: string; // server commitment for fairness
  result: "success"|"fail";
  payout?: number;
  resolvedAt?: string;
};

type Player = {
  id: string;
  address: string;
  reputation: ReputationLevel;
  credBalance: number;
  communityPoolShare: number;
};
API Contract (REST + SSE)
[Auth] Wallet signature for session (EIP-4361 Siwe).

[Broker]

GET /api/broker/offer

POST /api/broker/order

POST /api/broker/reputation/upgrade

[Rigs]

GET /api/rigs

POST /api/rigs/deploy

POST /api/rigs/maintenance

POST /api/rigs/upgrade

[Refinery]

GET /api/refinery/jobs

POST /api/refinery/submit

[Claims]

GET /api/claims

POST /api/claims/claim

[Dark Web]

GET /api/darkweb/layers

POST /api/darkweb/attempt

GET /api/darkweb/result/{attemptId}

[Economy]

GET /api/economy/telemetry

[Realtime SSE]

/api/sse/stream

Flow & UX Details
Broker Flow → Offer → Purchase → Animation → Burn receipt → Efficiency pulse

Rig Management → Drag-and-drop packs → Wear badges → Offline recovery → Upgrades

Refinement → Submit batches → Queue → ETA bars → Receipts

Claims → Maturity dial → Early tax calculator → Claim resets cycle

Dark Web → Layer stacks → Attempt cinematic → Provable hash badge → Retry guardrails

Provable Fairness
RNG → Client provides seed, server commitment, reveal verification

UI → Show hash pre-attempt, reveal + verify

Accessibility & i18n
A11y: Color contrast AA+, keyboard nav, reduced motion, aria live SSE updates

i18n: English baseline, JSON catalogs, all UI strings externalized

Performance & Quality
Perf: Code-split, image optimization, lazy-load animations, SSE handling

Testing: Storybook, Playwright, unit tests for helpers

Telemetry: Funnels, error logs, time-on-task

Acceptance Criteria
Design System implemented

Screens responsive + dark theme

Mechanics + SSE working

Wallet connect + mock tx

Fairness UI

Glitch/CRT polish

README + docs

Deliverables
Source: Next.js app + typed models + SSE + wallet

Design: Figma/tokens

Stories/Tests: Storybook + unit tests

Copy Guidelines
Lore Tone: “You’re breaching the Depth. Trust the shadows.”

Feedback: “Packet captured.”, “Firewall bite.”, “Trace diverted.”

Mermaid Map
mermaid
Copy code
flowchart TD
  Landing --> Broker
  Broker --> Rigs
  Rigs --> Refinement
  Refinement --> Claims
  Claims --> DarkWeb
  DarkWeb --> Dashboard
⚠️ Note: Always keep UI previews aligned to server truth. The game must feel high-stakes, neon-bathed, but still trustworthy and fair