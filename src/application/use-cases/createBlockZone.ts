import { BlockZone, createBlockZoneId } from '../../domain/entities/BlockZone';
import { BlockZoneRepository } from '../../domain/repositories/BlockZoneRepository';

export type CreateBlockZoneInput = Omit<BlockZone, 'id' | 'enabled'> & {
  enabled?: boolean;
};

export function createCreateBlockZoneUseCase(repository: BlockZoneRepository) {
  return async function createBlockZone(input: CreateBlockZoneInput): Promise<BlockZone> {
    const zone: BlockZone = {
      id: createBlockZoneId(),
      label: input.label,
      x: input.x,
      y: input.y,
      width: input.width,
      height: input.height,
      enabled: input.enabled ?? true,
    };
    await repository.save(zone);
    return zone;
  };
}
