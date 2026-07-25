import { BlockZone } from '../entities/BlockZone';
import { isPointBlocked, isPointInZone } from './blockZoneRules';

function makeZone(overrides: Partial<BlockZone> = {}): BlockZone {
  return {
    id: 'zone-1',
    label: 'Zona',
    x: 10,
    y: 10,
    width: 50,
    height: 50,
    enabled: true,
    ...overrides,
  };
}

describe('isPointInZone', () => {
  it('returns true for a point inside the rectangle', () => {
    expect(isPointInZone(makeZone(), { x: 20, y: 20 })).toBe(true);
  });

  it('returns true for a point exactly on the rectangle edge', () => {
    expect(isPointInZone(makeZone(), { x: 10, y: 60 })).toBe(true);
  });

  it('returns false for a point outside the rectangle', () => {
    expect(isPointInZone(makeZone(), { x: 5, y: 5 })).toBe(false);
  });
});

describe('isPointBlocked', () => {
  it('returns true when the point falls inside an enabled zone', () => {
    const zones = [makeZone({ id: 'a' }), makeZone({ id: 'b', x: 200, y: 200 })];
    expect(isPointBlocked(zones, { x: 15, y: 15 })).toBe(true);
  });

  it('ignores disabled zones', () => {
    const zones = [makeZone({ enabled: false })];
    expect(isPointBlocked(zones, { x: 15, y: 15 })).toBe(false);
  });

  it('returns false when no zone contains the point', () => {
    const zones = [makeZone()];
    expect(isPointBlocked(zones, { x: 500, y: 500 })).toBe(false);
  });
});
