import { BlockZone } from '../../domain/entities/BlockZone';
import { createToggleBlockZoneUseCase } from './toggleBlockZone';
import { InMemoryBlockZoneRepository } from './testUtils/InMemoryBlockZoneRepository';

describe('toggleBlockZone use case', () => {
  it('flips the enabled flag of the target zone', async () => {
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
    const toggleBlockZone = createToggleBlockZoneUseCase(repository);

    await toggleBlockZone('1');
    expect((await repository.getAll())[0].enabled).toBe(false);

    await toggleBlockZone('1');
    expect((await repository.getAll())[0].enabled).toBe(true);
  });

  it('is a no-op when the zone does not exist', async () => {
    const repository = new InMemoryBlockZoneRepository([]);
    const toggleBlockZone = createToggleBlockZoneUseCase(repository);

    await expect(toggleBlockZone('missing')).resolves.toBeUndefined();
  });
});
