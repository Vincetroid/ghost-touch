import { BlockZone } from '../entities/BlockZone';

export interface Point {
  x: number;
  y: number;
}

export function isPointInZone(zone: BlockZone, point: Point): boolean {
  return (
    point.x >= zone.x &&
    point.x <= zone.x + zone.width &&
    point.y >= zone.y &&
    point.y <= zone.y + zone.height
  );
}

export function isPointBlocked(zones: BlockZone[], point: Point): boolean {
  return zones.some((zone) => zone.enabled && isPointInZone(zone, point));
}
