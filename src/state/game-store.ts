import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { Draft } from "immer";
import { ExploitPack, Rig, RefineryJob, ClaimCycle, DarkWebAttempt, Player, BrokerOffer } from "@/types/game";
import { systemEfficiencyMultiplier, wearDelta, maturityPercent } from "@/lib/formulas";

export type DashboardKPI = {
  id: string;
  label: string;
  value: string;
  delta?: string;
  status?: "up" | "down" | "neutral";
};

type GameState = {
  player: Player;
  brokerOffer: BrokerOffer;
  exploitPacks: ExploitPack[];
  rigs: Rig[];
  refineryJobs: RefineryJob[];
  claimCycle: ClaimCycle;
  darkWebAttempts: DarkWebAttempt[];
  dashboardKpis: DashboardKPI[];
  systemOrderCount: number;
  getAvailablePacks: () => ExploitPack[];
  setBrokerOffer: (offer: BrokerOffer) => void;
  addExploitPack: (pack: ExploitPack) => void;
  updateRig: (rig: Rig) => void;
  toggleRigStatus: (rigId: string) => void;
  refreshRigWear: (rigId: string, minutesOffline: number) => void;
  deployPackToRig: (packId: string, rigId: string) => void;
  rotateRigOffline: (rigId: string) => void;
  submitRefineryJob: (rigId: string, amount: number) => void;
  purchaseExploitPack: (pack: ExploitPack, nextOffer: BrokerOffer) => void;
  upgradeReputation: () => void;
  setRefineryJobs: (jobs: RefineryJob[]) => void;
  updateClaimCycle: (cycle: ClaimCycle) => void;
  addDarkWebAttempt: (attempt: DarkWebAttempt) => void;
  recalcKPIs: () => void;
};

const initialPlayer: Player = {
  id: "player-zero",
  address: "0xCREDFADE",
  reputation: 2,
  credBalance: 1280,
  communityPoolShare: 0.042,
};

const initialOffer: BrokerOffer = {
  baseValue: 50,
  min: 22,
  max: 48,
  reputationWeight: 0.2,
  strain: systemEfficiencyMultiplier(6),
  timestamp: new Date().toISOString(),
};

const initialRigs: Rig[] = Array.from({ length: 4 }).map((_, idx) => {
  const wear = wearDelta(80 * (idx + 1));
  return {
    id: `rig-${idx + 1}`,
    level: 2 + idx,
    baseEfficiency: 0.72 - idx * 0.05,
    systemEffMultiplier: initialOffer.strain,
    wear,
    assignedAgents: idx % 2 === 0 ? ["agent-a", "agent-b"] : ["agent-c"],
    status: idx === 3 ? "maintenance" : "mining",
    queue: [],
    unrefinedStored: 120 + idx * 45,
  } satisfies Rig;
});

const initialRefinery: RefineryJob[] = [
  {
    id: "job-1",
    rigId: "rig-2",
    amountUnrefined: 220,
    startedAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    etaAt: new Date(Date.now() + 1000 * 60 * 25).toISOString(),
    level: 3,
  },
];

const initialClaimCycle: ClaimCycle = {
  refinedAvailable: 480,
  cycleStartAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
  lastClaimAt: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
};

const initialAttempts: DarkWebAttempt[] = [
  {
    id: "attempt-1",
    layer: 4,
    amount: 120,
    seed: "0xseed",
    serverCommitHash: "0xcommit",
    result: "success",
    payout: 198,
    resolvedAt: new Date(Date.now() - 1000 * 120).toISOString(),
  },
];

const createKPIs = (state: Partial<GameState>): DashboardKPI[] => {
  const maturity = maturityPercent(3);
  return [
    {
      id: "cred-wallet",
      label: "Wallet $CRED",
      value: `${state.player?.credBalance?.toLocaleString() ?? 0}`,
      delta: "+4.2%",
      status: "up",
    },
    {
      id: "rig-unrefined",
      label: "Unrefined in Rigs",
      value: `${state.rigs?.reduce((acc, rig) => acc + rig.unrefinedStored, 0) ?? 0}`,
      delta: "-3%",
      status: "down",
    },
    {
      id: "refinery-queue",
      label: "Refinery Queue",
      value: `${state.refineryJobs?.length ?? 0}`,
      status: "neutral",
    },
    {
      id: "claimable",
      label: "Claimable",
      value: `${Math.round((state.claimCycle?.refinedAvailable ?? 0) * maturity)} $CRED`,
      delta: `${Math.round(maturity * 100)}% mature`,
      status: "up",
    },
  ];
};

type ImmerSet = (fn: (draft: Draft<GameState>) => void) => void;

export const useGameStore = create<GameState>()(
  immer<GameState>((set: ImmerSet, get: () => GameState) => ({
    player: initialPlayer,
    brokerOffer: initialOffer,
    exploitPacks: [],
    rigs: initialRigs,
    refineryJobs: initialRefinery,
    claimCycle: initialClaimCycle,
    darkWebAttempts: initialAttempts,
    dashboardKpis: createKPIs({
      player: initialPlayer,
      rigs: initialRigs,
      refineryJobs: initialRefinery,
      claimCycle: initialClaimCycle,
    }),
    systemOrderCount: 6,
    getAvailablePacks: () => get().exploitPacks,
    setBrokerOffer: (offer: BrokerOffer) =>
      set((draft: Draft<GameState>) => {
        draft.brokerOffer = offer;
      }),
    addExploitPack: (pack: ExploitPack) =>
      set((draft: Draft<GameState>) => {
        draft.exploitPacks.unshift(pack);
      }),
    updateRig: (rig: Rig) =>
      set((draft: Draft<GameState>) => {
        const index = draft.rigs.findIndex((r: Rig) => r.id === rig.id);
        if (index >= 0) {
          draft.rigs[index] = rig;
        } else {
          draft.rigs.push(rig);
        }
      }),
    toggleRigStatus: (rigId: string) =>
      set((draft: Draft<GameState>) => {
        const rig = draft.rigs.find((r: Rig) => r.id === rigId);
        if (!rig) return;
        rig.status = rig.status === "mining" ? "offline" : "mining";
      }),
    refreshRigWear: (rigId: string, minutesOffline: number) =>
      set((draft: Draft<GameState>) => {
        const rig = draft.rigs.find((r: Rig) => r.id === rigId);
        if (!rig) return;
        const recovered = Math.max(0, rig.wear - minutesOffline * 0.0015);
        rig.wear = recovered;
        if (rig.status === "offline" && recovered <= 0.05) {
          rig.status = "mining";
        }
      }),
    deployPackToRig: (packId: string, rigId: string) =>
      set((draft: Draft<GameState>) => {
        const packIndex = draft.exploitPacks.findIndex((p: ExploitPack) => p.id === packId);
        const rig = draft.rigs.find((r: Rig) => r.id === rigId);
        if (packIndex < 0 || !rig) return;
        const [pack] = draft.exploitPacks.splice(packIndex, 1);
        rig.queue.push(pack);
        rig.status = "mining";
      }),
    rotateRigOffline: (rigId: string) =>
      set((draft: Draft<GameState>) => {
        const rig = draft.rigs.find((r: Rig) => r.id === rigId);
        if (!rig) return;
        rig.status = "offline";
      }),
    submitRefineryJob: (rigId: string, amount: number) =>
      set((draft: Draft<GameState>) => {
        const rig = draft.rigs.find((r: Rig) => r.id === rigId);
        if (!rig || rig.unrefinedStored < amount) return;
        rig.unrefinedStored -= amount;
        const throughputLevel = Math.max(1, rig.level);
        const durationMinutes = Math.max(20, Math.round((amount / throughputLevel) * 0.6));
        const start = new Date();
        const eta = new Date(start.getTime() + durationMinutes * 60 * 1000);
        draft.refineryJobs.unshift({
          id: crypto.randomUUID(),
          rigId,
          amountUnrefined: amount,
          startedAt: start.toISOString(),
          etaAt: eta.toISOString(),
          level: throughputLevel,
        });
        draft.dashboardKpis = createKPIs(draft);
      }),
    purchaseExploitPack: (pack: ExploitPack, nextOffer: BrokerOffer) =>
      set((draft: Draft<GameState>) => {
        draft.exploitPacks.unshift(pack);
        draft.systemOrderCount += 1;
        draft.player.credBalance = Math.max(0, draft.player.credBalance - (pack.valueCRED + 5));
        draft.brokerOffer = nextOffer;
        draft.dashboardKpis = createKPIs(draft);
      }),
    upgradeReputation: () =>
      set((draft: Draft<GameState>) => {
        if (draft.player.reputation < 5 && draft.player.credBalance >= 150) {
          draft.player.reputation += 1;
          draft.player.credBalance -= 150;
          draft.dashboardKpis = createKPIs(draft);
        }
      }),
    setRefineryJobs: (jobs: RefineryJob[]) =>
      set((draft: Draft<GameState>) => {
        draft.refineryJobs = jobs;
      }),
    updateClaimCycle: (cycle: ClaimCycle) =>
      set((draft: Draft<GameState>) => {
        draft.claimCycle = cycle;
      }),
    addDarkWebAttempt: (attempt: DarkWebAttempt) =>
      set((draft: Draft<GameState>) => {
        draft.darkWebAttempts.unshift(attempt);
      }),
    recalcKPIs: () =>
      set((draft: Draft<GameState>) => {
        draft.dashboardKpis = createKPIs(draft);
      }),
  }))
);
