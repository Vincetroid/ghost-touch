import { BlockZoneRepository } from '../../domain/repositories/BlockZoneRepository';

export function createToggleBlockZoneUseCase(repository: BlockZoneRepository) {
  return async function toggleBlockZone(id: string): Promise<void> {
    const zones = await repository.getAll();
    const zone = zones.find((candidate) => candidate.id === id);
    if (!zone) {
      return;
    }
    await repository.save({ ...zone, enabled: !zone.enabled });
  };
}
