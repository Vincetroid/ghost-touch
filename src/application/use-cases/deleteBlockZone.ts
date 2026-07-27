import { BlockZoneRepository } from '../../domain/repositories/BlockZoneRepository';

export function createDeleteBlockZoneUseCase(repository: BlockZoneRepository) {
  return function deleteBlockZone(id: string): Promise<void> {
    return repository.remove(id);
  };
}
