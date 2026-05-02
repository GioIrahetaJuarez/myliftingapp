import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import wp from '../../assets/jsonPref/workoutPlan';

export default function SplitSetter() {
  const [workoutPlan, setWorkoutPlan] = useState(wp);

  useEffect(() => {
    const load = async () => {
      const data = await AsyncStorage.getItem('workoutPlan');
      if (data) setWorkoutPlan(JSON.parse(data));
    };
    load();
  }, []);

  const addDay = () => {
    setWorkoutPlan([
      ...workoutPlan,
      { splitDay: 'New Day', groups: [{ group: 'Muscle Group', exercises: ['Exercise'] }] },
    ]);
  };

  const removeDay = (dayIndex) => {
    if (workoutPlan.length === 1) return;
    setWorkoutPlan(workoutPlan.filter((_, i) => i !== dayIndex));
  };

  const updateDayName = (dayIndex, newName) => {
    const updated = [...workoutPlan];
    updated[dayIndex].splitDay = newName;
    setWorkoutPlan(updated);
  };

  const addGroup = (dayIndex) => {
    const updated = [...workoutPlan];
    updated[dayIndex].groups.push({ group: 'Muscle Group', exercises: ['Exercise'] });
    setWorkoutPlan(updated);
  };

  const removeGroup = (dayIndex, groupIndex) => {
    if (workoutPlan[dayIndex].groups.length === 1) return;
    const updated = [...workoutPlan];
    updated[dayIndex].groups = updated[dayIndex].groups.filter((_, i) => i !== groupIndex);
    setWorkoutPlan(updated);
  };

  const updateGroupName = (dayIndex, groupIndex, newName) => {
    const updated = [...workoutPlan];
    updated[dayIndex].groups[groupIndex].group = newName;
    setWorkoutPlan(updated);
  };

  const addExercise = (dayIndex, groupIndex) => {
    const updated = [...workoutPlan];
    updated[dayIndex].groups[groupIndex].exercises.push('New Exercise');
    setWorkoutPlan(updated);
  };

  const removeExercise = (dayIndex, groupIndex, exerciseIndex) => {
    if (workoutPlan[dayIndex].groups[groupIndex].exercises.length === 1) return;
    const updated = [...workoutPlan];
    updated[dayIndex].groups[groupIndex].exercises =
      updated[dayIndex].groups[groupIndex].exercises.filter((_, i) => i !== exerciseIndex);
    setWorkoutPlan(updated);
  };

  const updateExercise = (dayIndex, groupIndex, exerciseIndex, newName) => {
    const updated = [...workoutPlan];
    updated[dayIndex].groups[groupIndex].exercises[exerciseIndex] = newName;
    setWorkoutPlan(updated);
  };

  const saveToStorage = async () => {
    await AsyncStorage.setItem('workoutPlan', JSON.stringify(workoutPlan));
    Alert.alert('Saved', 'Workout plan saved!');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Split Setter</Text>
        <Text style={styles.subtitle}>Build your workout routine</Text>

        {workoutPlan.map((day, dayIndex) => (
          <View key={dayIndex} style={styles.dayCard}>
            {/* Day Header */}
            <View style={styles.row}>
              <Text style={styles.dayLabel}>Day {dayIndex + 1}</Text>
              <TextInput
                style={styles.dayInput}
                value={day.splitDay}
                onChangeText={(val) => updateDayName(dayIndex, val)}
              />
              <TouchableOpacity
                style={[styles.removeBtn, workoutPlan.length === 1 && styles.disabled]}
                onPress={() => removeDay(dayIndex)}
                disabled={workoutPlan.length === 1}
              >
                <Text style={styles.removeBtnText}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* Groups */}
            {day.groups.map((group, groupIndex) => (
              <View key={groupIndex} style={styles.groupCard}>
                <View style={styles.row}>
                  <TextInput
                    style={[styles.input, { flex: 1 }]}
                    value={group.group}
                    onChangeText={(val) => updateGroupName(dayIndex, groupIndex, val)}
                  />
                  <TouchableOpacity
                    style={[styles.removeBtn, day.groups.length === 1 && styles.disabled]}
                    onPress={() => removeGroup(dayIndex, groupIndex)}
                    disabled={day.groups.length === 1}
                  >
                    <Text style={styles.removeBtnText}>✕</Text>
                  </TouchableOpacity>
                </View>

                {/* Exercises */}
                {group.exercises.map((exercise, exerciseIndex) => (
                  <View key={exerciseIndex} style={[styles.row, { marginTop: 6 }]}>
                    <TextInput
                      style={[styles.input, { flex: 1 }]}
                      value={exercise}
                      onChangeText={(val) => updateExercise(dayIndex, groupIndex, exerciseIndex, val)}
                    />
                    <TouchableOpacity
                      style={[styles.removeBtn, group.exercises.length === 1 && styles.disabled]}
                      onPress={() => removeExercise(dayIndex, groupIndex, exerciseIndex)}
                      disabled={group.exercises.length === 1}
                    >
                      <Text style={styles.removeBtnText}>✕</Text>
                    </TouchableOpacity>
                  </View>
                ))}

                <TouchableOpacity
                  style={styles.addExerciseBtn}
                  onPress={() => addExercise(dayIndex, groupIndex)}
                >
                  <Text style={styles.addExerciseBtnText}>+ Add Exercise</Text>
                </TouchableOpacity>
              </View>
            ))}

            <TouchableOpacity style={styles.addGroupBtn} onPress={() => addGroup(dayIndex)}>
              <Text style={styles.addGroupBtnText}>+ Add Muscle Group</Text>
            </TouchableOpacity>
          </View>
        ))}

        {/* Bottom Actions */}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.addDayBtn} onPress={addDay}>
            <Text style={styles.addDayBtnText}>+ Add Day</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveBtn} onPress={saveToStorage}>
            <Text style={styles.saveBtnText}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f2f2' },
  scroll: { padding: 16, paddingBottom: 40 },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 4 },
  subtitle: { fontSize: 14, color: '#666', marginBottom: 16 },

  dayCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  dayLabel: { fontSize: 12, fontWeight: '600', color: '#999', marginRight: 8 },
  dayInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 2,
    marginRight: 8,
  },

  groupCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },

  row: { flexDirection: 'row', alignItems: 'center' },

  input: {
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#fff',
    marginRight: 8,
  },

  removeBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#ffe5e5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeBtnText: { color: '#cc0000', fontSize: 12, fontWeight: '700' },
  disabled: { opacity: 0.3 },

  addExerciseBtn: { marginTop: 8, alignSelf: 'flex-start' },
  addExerciseBtnText: { color: '#001eff', fontSize: 13, fontWeight: '600' },

  addGroupBtn: { marginTop: 12, alignSelf: 'flex-start' },
  addGroupBtnText: { color: '#001eff', fontSize: 13, fontWeight: '600' },

  actions: { flexDirection: 'row', gap: 12, marginTop: 8 },
  addDayBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#001eff',
    alignItems: 'center',
  },
  addDayBtnText: { color: '#001eff', fontWeight: '700', fontSize: 15 },
  saveBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#001eff',
    alignItems: 'center',
  },
  saveBtnText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});