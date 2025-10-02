export function systemEfficiencyMultiplier(orderCount: number): number {
  if (orderCount <= 1) return 1;
  const steps = orderCount - 1;
  const raw = Math.pow(0.96, steps);
  const clamped = Math.max(0.05, raw);
  return steps >= 59 ? 0.05 : clamped;
}

export function wearDelta(minutesOnline: number, wearRate = 0.002): number {
  return Math.min(0.3, 1 - Math.exp(-wearRate * minutesOnline));
}

export function recoveryDelta(minutesOffline: number, recoveryRate = 0.01): number {
  return Math.min(1, 1 - Math.exp(-recoveryRate * minutesOffline));
}

export function maturityPercent(daysSinceRefineStart: number): number {
  return Math.min(1, 0.7 + 0.05 * Math.max(0, Math.floor(daysSinceRefineStart) - 1));
}

export function earlyClaimTax(maturity: number): number {
  return 1 - maturity;
}
