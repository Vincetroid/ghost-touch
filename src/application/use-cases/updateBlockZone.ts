import { BlockZone } from '../../domain/entities/BlockZone';
import { BlockZoneRepository } from '../../domain/repositories/BlockZoneRepository';

export function createUpdateBlockZoneUseCase(repository: BlockZoneRepository) {
  return function updateBlockZone(zone: BlockZone): Promise<void> {
    return repository.save(zone);
  };
}
