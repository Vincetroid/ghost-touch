import { BlockZone } from '../entities/BlockZone';

export interface BlockZoneRepository {
  getAll(): Promise<BlockZone[]>;
  /** Persists a zone, creating it if `zone.id` is new or overwriting it otherwise. */
  save(zone: BlockZone): Promise<void>;
  remove(id: string): Promise<void>;
}
