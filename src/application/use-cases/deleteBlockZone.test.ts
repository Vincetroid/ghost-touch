import { BlockZone } from '../../domain/entities/BlockZone';
import { createDeleteBlockZoneUseCase } from './deleteBlockZone';
import { InMemoryBlockZoneRepository } from './testUtils/InMemoryBlockZoneRepository';

describe('deleteBlockZone use case', () => {
  it('removes the zone with the given id', async () => {
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
    const deleteBlockZone = createDeleteBlockZoneUseCase(repository);

    await deleteBlockZone('1');

    await expect(repository.getAll()).resolves.toEqual([]);
  });
});
