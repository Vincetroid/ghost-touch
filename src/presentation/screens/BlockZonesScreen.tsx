import { useCallback, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BlockZoneOverlay } from '@/presentation/components/BlockZoneOverlay';
import { DraggableZone } from '@/presentation/components/DraggableZone';
import { useBlockZones } from '@/presentation/hooks/useBlockZones';

const DEFAULT_ZONE = { x: 40, y: 120, width: 120, height: 120 };

export default function BlockZonesScreen() {
  const { zones, isLoading, addZone, updateZoneLocally, commitZone, removeZone, toggleZone } =
    useBlockZones();
  const [isEditing, setIsEditing] = useState(false);

  const handleAddZone = useCallback(() => {
    addZone({ label: `Zona ${zones.length + 1}`, ...DEFAULT_ZONE });
  }, [addZone, zones.length]);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Ghost Touch</Text>
          <Text style={styles.subtitle}>Bloquea zonas de la pantalla</Text>
        </View>
        <Pressable onPress={() => setIsEditing((prev) => !prev)} style={styles.headerButton}>
          <Text style={styles.headerButtonText}>{isEditing ? 'Listo' : 'Editar zonas'}</Text>
        </Pressable>
      </View>

      <View style={styles.canvas}>
        {isEditing ? (
          zones.map((zone) => (
            <DraggableZone
              key={zone.id}
              zone={zone}
              onLiveChange={updateZoneLocally}
              onCommit={commitZone}
              onRemove={removeZone}
            />
          ))
        ) : (
          <BlockZoneOverlay zones={zones} />
        )}

        {isEditing && (
          <Pressable onPress={handleAddZone} style={styles.addButton}>
            <Text style={styles.addButtonText}>+ Nueva zona</Text>
          </Pressable>
        )}
      </View>

      <FlatList
        data={zones}
        keyExtractor={(zone) => zone.id}
        style={styles.list}
        contentContainerStyle={zones.length === 0 && styles.listEmptyContainer}
        ListEmptyComponent={
          !isLoading ? (
            <Text style={styles.emptyText}>
              No hay zonas bloqueadas todavía. Toca &quot;Editar zonas&quot; para crear una.
            </Text>
          ) : null
        }
        renderItem={({ item }) => (
          <View style={styles.listRow}>
            <Text style={styles.listLabel} numberOfLines={1}>
              {item.label}
            </Text>
            <Switch value={item.enabled} onValueChange={() => toggleZone(item.id)} />
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b0b0c',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
  },
  subtitle: {
    color: '#8e8e93',
    fontSize: 13,
    marginTop: 2,
  },
  headerButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#1c1c1e',
  },
  headerButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  canvas: {
    flex: 1,
    backgroundColor: '#000',
  },
  addButton: {
    position: 'absolute',
    bottom: 16,
    alignSelf: 'center',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 24,
    backgroundColor: '#ff453a',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '700',
  },
  list: {
    maxHeight: 200,
    backgroundColor: '#0b0b0c',
  },
  listEmptyContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  listRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#2c2c2e',
  },
  listLabel: {
    color: '#fff',
    fontSize: 15,
    flexShrink: 1,
    marginRight: 12,
  },
  emptyText: {
    color: '#8e8e93',
    textAlign: 'center',
    paddingHorizontal: 32,
  },
});
