import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { VictoryAxis, VictoryChart, VictoryLine, VictoryTooltip, VictoryVoronoiContainer } from 'victory-native';

const EXERCISES = [
  'Barbell Bench Press',
  'Squat',
  'Deadlift',
  'Overhead Press',
  'Barbell Row',
];

const DATA_KEYS = ['weight', 'reps'];

export default function DataVis() {
  const [selectedExercise, setSelectedExercise] = useState(EXERCISES[0]);
  const [selectedDataKey, setSelectedDataKey] = useState('weight');
  const [selectedLog, setSelectedLog] = useState([]);

  useEffect(() => {
    const load = async () => {
      const raw = await AsyncStorage.getItem('workoutLog');
      const workoutLog = JSON.parse(raw || '[]');

      const data = workoutLog
        .filter((day) => day.exercises?.find((ex) => ex.name === selectedExercise))
        .map((day) => {
          const found = day.exercises.find((ex) => ex.name === selectedExercise);
          return { date: day.date, weight: found.weight, reps: found.reps };
        });

      setSelectedLog(data);
    };
    load();
  }, [selectedExercise]);

  const chartData = selectedLog.map((entry, i) => ({
    x: i + 1,
    y: entry[selectedDataKey],
    label: `${entry.date}\n${entry[selectedDataKey]} ${selectedDataKey === 'weight' ? 'lbs' : 'reps'}`,
  }));

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Data Vis</Text>

        {/* Exercise Selector */}
        <Text style={styles.sectionLabel}>Exercise</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipRow}>
          {EXERCISES.map(ex => (
            <TouchableOpacity
              key={ex}
              style={[styles.chip, selectedExercise === ex && styles.chipActive]}
              onPress={() => setSelectedExercise(ex)}
            >
              <Text style={[styles.chipText, selectedExercise === ex && styles.chipTextActive]}>
                {ex}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Data Key Toggle */}
        <View style={styles.toggleRow}>
          {DATA_KEYS.map(key => (
            <TouchableOpacity
              key={key}
              style={[styles.toggleBtn, selectedDataKey === key && styles.toggleBtnActive]}
              onPress={() => setSelectedDataKey(key)}
            >
              <Text style={[styles.toggleText, selectedDataKey === key && styles.toggleTextActive]}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Chart */}
        {chartData.length > 0 ? (
          <View style={styles.chartContainer}>
            <VictoryChart
containerComponent={<VictoryVoronoiContainer />}
              padding={{ top: 20, bottom: 50, left: 60, right: 30 }}
            >
              <VictoryAxis
                tickFormat={(t) => {
                  const entry = selectedLog[t - 1];
                  return entry ? entry.date.slice(5) : '';
                }}
                style={{ tickLabels: { fontSize: 9, angle: -35 } }}
              />
              <VictoryAxis
                dependentAxis
                label={selectedDataKey === 'weight' ? 'lbs' : 'reps'}
                style={{ axisLabel: { padding: 45, fontSize: 12 } }}
              />
              <VictoryLine
                data={chartData}
                style={{ data: { stroke: '#001eff', strokeWidth: 2 } }}
                labelComponent={<VictoryTooltip />}
              />
            </VictoryChart>
          </View>
        ) : (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No data for {selectedExercise}</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scroll: { padding: 16 },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 16 },
  sectionLabel: { fontSize: 13, fontWeight: '600', color: '#666', marginBottom: 8 },
  chipRow: { flexDirection: 'row', marginBottom: 16 },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    marginRight: 8,
    backgroundColor: '#f5f5f5',
  },
  chipActive: { backgroundColor: '#001eff', borderColor: '#001eff' },
  chipText: { fontSize: 13, color: '#333' },
  chipTextActive: { color: '#fff', fontWeight: '600' },
  toggleRow: { flexDirection: 'row', marginBottom: 16, gap: 8 },
  toggleBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  toggleBtnActive: { backgroundColor: '#001eff', borderColor: '#001eff' },
  toggleText: { fontSize: 14, color: '#333', fontWeight: '500' },
  toggleTextActive: { color: '#fff', fontWeight: '700' },
  chartContainer: { borderRadius: 16, overflow: 'hidden', backgroundColor: '#fafafa' },
  empty: { alignItems: 'center', marginTop: 60 },
  emptyText: { color: '#999', fontSize: 15 },
});