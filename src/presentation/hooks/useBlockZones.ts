import { useCallback, useEffect, useState } from 'react';

import { blockZoneUseCases } from '@/di';
import { BlockZone } from '@/domain/entities/BlockZone';
import { CreateBlockZoneInput } from '@/application/use-cases/createBlockZone';

export function useBlockZones() {
  const [zones, setZones] = useState<BlockZone[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useCallback(async () => {
    const result = await blockZoneUseCases.list();
    setZones(result);
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const result = await blockZoneUseCases.list();
      if (cancelled) {
        return;
      }
      setZones(result);
      setIsLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const addZone = useCallback(
    async (input: CreateBlockZoneInput) => {
      await blockZoneUseCases.create(input);
      await refresh();
    },
    [refresh]
  );

  // Updates local state only, without touching storage. Used while a zone is
  // actively being dragged/resized so the UI stays responsive; call
  // `commitZone` once the gesture ends to persist the final geometry.
  const updateZoneLocally = useCallback((zone: BlockZone) => {
    setZones((prev) => prev.map((candidate) => (candidate.id === zone.id ? zone : candidate)));
  }, []);

  const commitZone = useCallback(
    async (zone: BlockZone) => {
      updateZoneLocally(zone);
      await blockZoneUseCases.update(zone);
    },
    [updateZoneLocally]
  );

  const removeZone = useCallback(
    async (id: string) => {
      await blockZoneUseCases.remove(id);
      await refresh();
    },
    [refresh]
  );

  const toggleZone = useCallback(
    async (id: string) => {
      await blockZoneUseCases.toggle(id);
      await refresh();
    },
    [refresh]
  );

  return {
    zones,
    isLoading,
    addZone,
    updateZoneLocally,
    commitZone,
    removeZone,
    toggleZone,
  };
}
