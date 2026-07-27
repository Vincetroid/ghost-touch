import { useEffect, useRef, useState } from 'react';
import {
  GestureResponderEvent,
  PanResponder,
  PanResponderGestureState,
  PanResponderInstance,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { BlockZone } from '@/domain/entities/BlockZone';

const MIN_SIZE = 32;

type Props = {
  zone: BlockZone;
  onLiveChange: (zone: BlockZone) => void;
  onCommit: (zone: BlockZone) => void;
  onRemove: (id: string) => void;
};

// PanResponders are built once, inside an effect, because they close over
// mutable refs that must only ever be read/written outside of render.
function useDragResponder(
  zoneRef: React.RefObject<BlockZone>,
  onLiveChange: Props['onLiveChange'],
  onCommit: Props['onCommit']
): PanResponderInstance | null {
  const origin = useRef({ x: 0, y: 0 });
  const [responder, setResponder] = useState<PanResponderInstance | null>(null);

  useEffect(() => {
    setResponder(
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
          origin.current = { x: zoneRef.current.x, y: zoneRef.current.y };
        },
        onPanResponderMove: (_event: GestureResponderEvent, gesture: PanResponderGestureState) => {
          onLiveChange({
            ...zoneRef.current,
            x: origin.current.x + gesture.dx,
            y: origin.current.y + gesture.dy,
          });
        },
        onPanResponderRelease: () => onCommit(zoneRef.current),
        onPanResponderTerminate: () => onCommit(zoneRef.current),
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return responder;
}

function useResizeResponder(
  zoneRef: React.RefObject<BlockZone>,
  onLiveChange: Props['onLiveChange'],
  onCommit: Props['onCommit']
): PanResponderInstance | null {
  const origin = useRef({ width: 0, height: 0 });
  const [responder, setResponder] = useState<PanResponderInstance | null>(null);

  useEffect(() => {
    setResponder(
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
          origin.current = { width: zoneRef.current.width, height: zoneRef.current.height };
        },
        onPanResponderMove: (_event: GestureResponderEvent, gesture: PanResponderGestureState) => {
          onLiveChange({
            ...zoneRef.current,
            width: Math.max(MIN_SIZE, origin.current.width + gesture.dx),
            height: Math.max(MIN_SIZE, origin.current.height + gesture.dy),
          });
        },
        onPanResponderRelease: () => onCommit(zoneRef.current),
        onPanResponderTerminate: () => onCommit(zoneRef.current),
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return responder;
}

export function DraggableZone({ zone, onLiveChange, onCommit, onRemove }: Props) {
  const zoneRef = useRef(zone);
  useEffect(() => {
    zoneRef.current = zone;
  }, [zone]);

  const dragResponder = useDragResponder(zoneRef, onLiveChange, onCommit);
  const resizeResponder = useResizeResponder(zoneRef, onLiveChange, onCommit);

  return (
    <View
      {...dragResponder?.panHandlers}
      style={[
        styles.zone,
        { left: zone.x, top: zone.y, width: zone.width, height: zone.height },
      ]}
    >
      <Text style={styles.label} numberOfLines={1}>
        {zone.label}
      </Text>
      <Pressable onPress={() => onRemove(zone.id)} hitSlop={8} style={styles.removeButton}>
        <Text style={styles.removeButtonText}>×</Text>
      </Pressable>
      <View {...resizeResponder?.panHandlers} style={styles.resizeHandle} />
    </View>
  );
}

const styles = StyleSheet.create({
  zone: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: '#ff453a',
    borderStyle: 'dashed',
    borderRadius: 8,
    backgroundColor: 'rgba(255, 69, 58, 0.15)',
  },
  label: {
    position: 'absolute',
    top: 4,
    left: 6,
    color: '#ff453a',
    fontSize: 12,
    fontWeight: '600',
  },
  removeButton: {
    position: 'absolute',
    top: -12,
    right: -12,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#ff453a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 16,
    marginTop: -1,
  },
  resizeHandle: {
    position: 'absolute',
    right: -10,
    bottom: -10,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#ff453a',
  },
});
