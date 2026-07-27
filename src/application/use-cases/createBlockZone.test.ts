import { createCreateBlockZoneUseCase } from './createBlockZone';
import { InMemoryBlockZoneRepository } from './testUtils/InMemoryBlockZoneRepository';

describe('createBlockZone use case', () => {
  it('persists a new zone with a generated id and enabled by default', async () => {
    const repository = new InMemoryBlockZoneRepository();
    const createBlockZone = createCreateBlockZoneUseCase(repository);

    const zone = await createBlockZone({ label: 'Zona 1', x: 0, y: 0, width: 100, height: 100 });

    expect(zone.id).toBeTruthy();
    expect(zone.enabled).toBe(true);
    await expect(repository.getAll()).resolves.toEqual([zone]);
  });

  it('respects an explicit enabled value', async () => {
    const repository = new InMemoryBlockZoneRepository();
    const createBlockZone = createCreateBlockZoneUseCase(repository);

    const zone = await createBlockZone({
      label: 'Zona 2',
      x: 0,
      y: 0,
      width: 10,
      height: 10,
      enabled: false,
    });

    expect(zone.enabled).toBe(false);
  });
});
