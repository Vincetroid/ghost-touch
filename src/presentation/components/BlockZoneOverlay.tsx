import { StyleSheet, View } from 'react-native';

import { BlockZone } from '@/domain/entities/BlockZone';

type Props = {
  zones: BlockZone[];
};

/**
 * Renders every enabled zone as an absolutely positioned view that claims the
 * touch responder as soon as a touch starts and never releases it, so any
 * touch landing inside the zone (ghost or real) is swallowed before it
 * reaches whatever is rendered underneath.
 */
export function BlockZoneOverlay({ zones }: Props) {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
      {zones
        .filter((zone) => zone.enabled)
        .map((zone) => (
          <View
            key={zone.id}
            onStartShouldSetResponder={() => true}
            onResponderTerminationRequest={() => false}
            style={[
              styles.zone,
              { left: zone.x, top: zone.y, width: zone.width, height: zone.height },
            ]}
          />
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  zone: {
    position: 'absolute',
  },
});
