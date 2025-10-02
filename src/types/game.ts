export type ReputationLevel = 0 | 1 | 2 | 3 | 4 | 5;

export type ExploitPack = {
  id: string;
  valueCRED: number;
  acquiredAt: string;
  source: "broker";
};

export type RigStatus = "idle" | "mining" | "offline" | "maintenance";

export type Rig = {
  id: string;
  level: number;
  baseEfficiency: number;
  systemEffMultiplier: number;
  wear: number;
  assignedAgents: string[];
  status: RigStatus;
  queue: ExploitPack[];
  unrefinedStored: number;
};

export type RefineryJob = {
  id: string;
  rigId: string;
  amountUnrefined: number;
  startedAt: string;
  etaAt: string;
  level: number;
};

export type ClaimCycle = {
  refinedAvailable: number;
  cycleStartAt: string;
  lastClaimAt?: string;
};

export type DarkWebAttemptResult = "success" | "fail";

export type DarkWebAttempt = {
  id: string;
  layer: number;
  amount: number;
  seed: string;
  serverCommitHash: string;
  result: DarkWebAttemptResult;
  payout?: number;
  resolvedAt?: string;
};

export type Player = {
  id: string;
  address: string;
  reputation: ReputationLevel;
  credBalance: number;
  communityPoolShare: number;
};

export type BrokerOffer = {
  baseValue: number;
  min: number;
  max: number;
  reputationWeight: number;
  strain: number;
  timestamp: string;
};

export type SSEEvent =
  | {
      type: "broker:order-settled";
      data: ExploitPack & { feeBurned: number; orderCount: number };
    }
  | { type: "rig:update"; data: Rig }
  | { type: "refinery:job-update"; data: RefineryJob }
  | { type: "claims:cycle-update"; data: ClaimCycle }
  | { type: "darkweb:attempt-result"; data: DarkWebAttempt }
  | {
      type: "economy:telemetry";
      data: { pool: number; burns: number; ledger: number; updatedAt: string };
    };
