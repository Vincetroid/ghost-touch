import { BlockZone } from '../../domain/entities/BlockZone';
import { createListBlockZonesUseCase } from './listBlockZones';
import { InMemoryBlockZoneRepository } from './testUtils/InMemoryBlockZoneRepository';

describe('listBlockZones use case', () => {
  it('returns all zones from the repository', async () => {
    const zone: BlockZone = {
      id: '1',
      label: 'Zona',
      x: 0,
      y: 0,
      width: 10,
      height: 10,
      enabled: true,
    };
    const repository = new InMemoryBlockZoneRepository([zone]);
    const listBlockZones = createListBlockZonesUseCase(repository);

    await expect(listBlockZones()).resolves.toEqual([zone]);
  });
});
