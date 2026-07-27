import { BlockZone } from '../../domain/entities/BlockZone';
import { createUpdateBlockZoneUseCase } from './updateBlockZone';
import { InMemoryBlockZoneRepository } from './testUtils/InMemoryBlockZoneRepository';

describe('updateBlockZone use case', () => {
  it('overwrites the geometry of an existing zone', async () => {
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
    const updateBlockZone = createUpdateBlockZoneUseCase(repository);

    await updateBlockZone({ ...zone, x: 50, y: 60 });

    const [updated] = await repository.getAll();
    expect(updated).toMatchObject({ x: 50, y: 60 });
  });
});
