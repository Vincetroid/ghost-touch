import AsyncStorage from '@react-native-async-storage/async-storage';

import { BlockZone } from '../../domain/entities/BlockZone';
import { BlockZoneRepository } from '../../domain/repositories/BlockZoneRepository';

const STORAGE_KEY = '@ghost-touch/block-zones';

export class AsyncStorageBlockZoneRepository implements BlockZoneRepository {
  async getAll(): Promise<BlockZone[]> {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
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
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(zones));
  }

  async remove(id: string): Promise<void> {
    const zones = await this.getAll();
    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(zones.filter((zone) => zone.id !== id))
    );
  }
}
