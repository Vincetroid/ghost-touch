export interface BlockZone {
  id: string;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  enabled: boolean;
}

export function createBlockZoneId(): string {
  return `zone_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}
