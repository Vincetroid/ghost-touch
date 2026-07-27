import { createCreateBlockZoneUseCase } from './application/use-cases/createBlockZone';
import { createDeleteBlockZoneUseCase } from './application/use-cases/deleteBlockZone';
import { createListBlockZonesUseCase } from './application/use-cases/listBlockZones';
import { createToggleBlockZoneUseCase } from './application/use-cases/toggleBlockZone';
import { createUpdateBlockZoneUseCase } from './application/use-cases/updateBlockZone';
import { MMKVBlockZoneRepository } from './infrastructure/repositories/MMKVBlockZoneRepository';

const blockZoneRepository = new MMKVBlockZoneRepository();

export const blockZoneUseCases = {
  list: createListBlockZonesUseCase(blockZoneRepository),
  create: createCreateBlockZoneUseCase(blockZoneRepository),
  update: createUpdateBlockZoneUseCase(blockZoneRepository),
  remove: createDeleteBlockZoneUseCase(blockZoneRepository),
  toggle: createToggleBlockZoneUseCase(blockZoneRepository),
};
