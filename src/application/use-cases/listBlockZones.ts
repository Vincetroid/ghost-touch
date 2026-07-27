import { BlockZone } from '../../domain/entities/BlockZone';
import { BlockZoneRepository } from '../../domain/repositories/BlockZoneRepository';

export function createListBlockZonesUseCase(repository: BlockZoneRepository) {
  return function listBlockZones(): Promise<BlockZone[]> {
    return repository.getAll();
  };
}
