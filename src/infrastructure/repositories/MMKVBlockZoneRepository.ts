import { createMMKV, MMKV } from 'react-native-mmkv';

import { BlockZone } from '../../domain/entities/BlockZone';
import { BlockZoneRepository } from '../../domain/repositories/BlockZoneRepository';

const STORAGE_KEY = '@ghost-touch/block-zones';

export class MMKVBlockZoneRepository implements BlockZoneRepository {
  constructor(private readonly storage: MMKV = createMMKV()) {}

  async getAll(): Promise<BlockZone[]> {
    const raw = this.storage.getString(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as BlockZone[]) : [];
  }

  async save(zone: BlockZone): Promise<void> {
    const zones = await this.getAll();
    const index = zones.findIndex((candidate) => candidate.id === zone.id);
    if (index >= 0) {
      zones[index] = zone;
    } else {
      zones.push(zone);
    }
    this.storage.set(STORAGE_KEY, JSON.stringify(zones));
  }

  async remove(id: string): Promise<void> {
    const zones = await this.getAll();
    this.storage.set(STORAGE_KEY, JSON.stringify(zones.filter((zone) => zone.id !== id)));
  }
}
