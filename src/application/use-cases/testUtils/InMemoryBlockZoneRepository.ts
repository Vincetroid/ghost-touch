import { BlockZone } from '../../../domain/entities/BlockZone';
import { BlockZoneRepository } from '../../../domain/repositories/BlockZoneRepository';

export class InMemoryBlockZoneRepository implements BlockZoneRepository {
  private zones: BlockZone[];

  constructor(initial: BlockZone[] = []) {
    this.zones = [...initial];
  }

  async getAll(): Promise<BlockZone[]> {
    return [...this.zones];
  }

  async save(zone: BlockZone): Promise<void> {
    const index = this.zones.findIndex((candidate) => candidate.id === zone.id);
    if (index >= 0) {
      this.zones[index] = zone;
    } else {
      this.zones.push(zone);
    }
  }

  async remove(id: string): Promise<void> {
    this.zones = this.zones.filter((zone) => zone.id !== id);
  }
}
