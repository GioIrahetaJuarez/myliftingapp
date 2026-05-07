import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import wp from "../../assets/jsonPref/workoutPlan";
import {
  createExercise,
  createMuscleGroup,
  createSplitDay,
  deleteExercise,
  deleteMuscleGroup,
  deleteSplitDay,
  updateExercise,
  updateMuscleGroup,
  updateSplitDay,
} from "../../utils/db/dal/SplitServices";

type WorkoutDay = {
  id?: number;
  name: string;
  orderIndex?: number;
  status?: "create" | "update" | "delete";
  persistedOrderIndex?: number;
  groups: {
    name: string;
    exercises: {
      name: string;
    }[];
  }[];
};

const cleanWorkoutPlan = (plan: WorkoutDay[]) =>
  plan
    .filter((day) => day.status !== "delete")
    .map(({ status, persistedOrderIndex, ...day }, index) => ({
      ...day,
      orderIndex: index,
      groups: day.groups.map((group) => ({
        ...group,
        exercises: group.exercises.map((exercise) => ({ ...exercise })),
      })),
    }));

const getNextStatus = (day: WorkoutDay): WorkoutDay["status"] =>
  day.status === "create" ? "create" : "update";

export default function SplitSetter() {
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutDay[]>(wp);
  const visibleWorkoutPlan = workoutPlan
    .map((day, dayIndex) => ({ day, dayIndex }))
    .filter(({ day }) => day.status !== "delete");

  useEffect(() => {
    const load = async () => {
      const data = await AsyncStorage.getItem("workoutPlan");
      if (data) setWorkoutPlan(JSON.parse(data));
    };
    load();
  }, []);

  const updateDay = (
    dayIndex: number,
    updater: (day: WorkoutDay) => WorkoutDay,
  ) => {
    setWorkoutPlan((currentPlan) =>
      currentPlan.map((day, index) => {
        if (index !== dayIndex) return day;
        const updatedDay = updater({
          ...day,
          groups: day.groups.map((group) => ({
            ...group,
            exercises: [...group.exercises],
          })),
        });

        return {
          ...updatedDay,
          status: getNextStatus(day),
        };
      }),
    );
  };

  const addDay = () => {
    setWorkoutPlan((currentPlan) => [
      ...currentPlan,
      {
        name: "New Day",
        status: "create",
        groups: [{ name: "Muscle Group", exercises: [{ name: "Exercise" }] }],
      },
    ]);
  };

  const removeDay = (dayIndex: number) => {
    if (visibleWorkoutPlan.length === 1) return;

    setWorkoutPlan((currentPlan) => {
      const day = currentPlan[dayIndex];
      if (day.status === "create")
        return currentPlan.filter((_, index) => index !== dayIndex);

      return currentPlan.map((currentDay, index) =>
        index === dayIndex ? { ...currentDay, status: "delete" } : currentDay,
      );
    });
  };

  const updateDayName = (dayIndex: number, newName: string) => {
    updateDay(dayIndex, (day) => ({ ...day, name: newName }));
  };

  const addGroup = (dayIndex: number) => {
    updateDay(dayIndex, (day) => ({
      ...day,
      groups: [
        ...day.groups,
        { name: "Muscle Group", exercises: [{ name: "Exercise" }] },
      ],
    }));
  };

  const removeGroup = (dayIndex: number, groupIndex: number) => {
    if (workoutPlan[dayIndex].groups.length === 1) return;
    updateDay(dayIndex, (day) => ({
      ...day,
      groups: day.groups.filter((_, index) => index !== groupIndex),
    }));
  };

  const updateGroupName = (
    dayIndex: number,
    groupIndex: number,
    newName: string,
  ) => {
    updateDay(dayIndex, (day) => ({
      ...day,
      groups: day.groups.map((group, index) =>
        index === groupIndex ? { ...group, name: newName } : group,
      ),
    }));
  };

  const addExercise = (dayIndex: number, groupIndex: number) => {
    updateDay(dayIndex, (day) => ({
      ...day,
      groups: day.groups.map((group, index) =>
        index === groupIndex
          ? {
              ...group,
              exercises: [...group.exercises, { name: "New Exercise" }],
            }
          : group,
      ),
    }));
  };

  const removeExercise = (
    dayIndex: number,
    groupIndex: number,
    exerciseIndex: number,
  ) => {
    if (workoutPlan[dayIndex].groups[groupIndex].exercises.length === 1) return;
    updateDay(dayIndex, (day) => ({
      ...day,
      groups: day.groups.map((group, index) =>
        index === groupIndex
          ? {
              ...group,
              exercises: group.exercises.filter(
                (_, currentIndex) => currentIndex !== exerciseIndex,
              ),
            }
          : group,
      ),
    }));
  };

  const renameExercise = (
    dayIndex: number,
    groupIndex: number,
    exerciseIndex: number,
    newName: string,
  ) => {
    updateDay(dayIndex, (day) => ({
      ...day,
      groups: day.groups.map((group, index) =>
        index === groupIndex
          ? {
              ...group,
              exercises: group.exercises.map((exercise, currentIndex) =>
                currentIndex === exerciseIndex
                  ? { ...exercise, name: newName }
                  : exercise,
              ),
            }
          : group,
      ),
    }));
  };

  const saveToStorage = async () => {
    let visibleOrderIndex = 0;

    for (const day of workoutPlan) {
      if (day.status === "delete") {
        if (day.id) await deleteSplitDay(day.id);
        continue;
      } else if (day.status === "create") {
        day.id = await createSplitDay(day, visibleOrderIndex);
      } else if (day.status === "update" && day.id) {
        await updateSplitDay(day.id, day.name);
      }

      for (const group of day.groups) {
        if (group.status === "delete") {
          if (group.id) await deleteMuscleGroup(group.id);
          continue;
        } else if (group.status === "create") {
          group.id = await createMuscleGroup(group, day.id!);
        } else if (group.status === "update" && group.id) {
          await updateMuscleGroup(group.id, group.name);
        }

        for (const exercise of group.exercises) {
          if (exercise.status === "delete") {
            if (exercise.id) await deleteExercise(exercise.id);
          } else if (exercise.status === "create") {
            await createExercise(exercise, group.id!);
          } else if (exercise.status === "update" && exercise.id) {
            await updateExercise(exercise.id, exercise.name);
          }
        }
      }

      visibleOrderIndex += 1;
    }

    const savedWorkoutPlan = cleanWorkoutPlan(workoutPlan);
    setWorkoutPlan(savedWorkoutPlan);
    Alert.alert("Saved", "Workout plan saved!");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Split Setter</Text>
        <Text style={styles.subtitle}>Build your workout routine</Text>

        {visibleWorkoutPlan.map(({ day, dayIndex }, visibleIndex) => (
          <View key={dayIndex} style={styles.dayCard}>
            {/* Day Header */}
            <View style={styles.row}>
              <Text style={styles.dayLabel}>Day {visibleIndex + 1}</Text>
              <TextInput
                style={styles.dayInput}
                value={day.name}
                onChangeText={(val) => updateDayName(dayIndex, val)}
              />
              <TouchableOpacity
                style={[
                  styles.removeBtn,
                  visibleWorkoutPlan.length === 1 && styles.disabled,
                ]}
                onPress={() => removeDay(dayIndex)}
                disabled={visibleWorkoutPlan.length === 1}
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
                    value={group.name}
                    onChangeText={(val) =>
                      updateGroupName(dayIndex, groupIndex, val)
                    }
                  />
                  <TouchableOpacity
                    style={[
                      styles.removeBtn,
                      day.groups.length === 1 && styles.disabled,
                    ]}
                    onPress={() => removeGroup(dayIndex, groupIndex)}
                    disabled={day.groups.length === 1}
                  >
                    <Text style={styles.removeBtnText}>✕</Text>
                  </TouchableOpacity>
                </View>

                {/* Exercises */}
                {group.exercises.map((exercise, exerciseIndex) => (
                  <View
                    key={exerciseIndex}
                    style={[styles.row, { marginTop: 6 }]}
                  >
                    <TextInput
                      style={[styles.input, { flex: 1 }]}
                      value={exercise.name}
                      onChangeText={(val) =>
                        renameExercise(dayIndex, groupIndex, exerciseIndex, val)
                      }
                    />
                    <TouchableOpacity
                      style={[
                        styles.removeBtn,
                        group.exercises.length === 1 && styles.disabled,
                      ]}
                      onPress={() =>
                        removeExercise(dayIndex, groupIndex, exerciseIndex)
                      }
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

            <TouchableOpacity
              style={styles.addGroupBtn}
              onPress={() => addGroup(dayIndex)}
            >
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
  container: { flex: 1, backgroundColor: "#f2f2f2" },
  scroll: { padding: 16, paddingBottom: 40 },
  title: { fontSize: 28, fontWeight: "700", marginBottom: 4 },
  subtitle: { fontSize: 14, color: "#666", marginBottom: 16 },

  dayCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  dayLabel: { fontSize: 12, fontWeight: "600", color: "#999", marginRight: 8 },
  dayInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingVertical: 2,
    marginRight: 8,
  },

  groupCard: {
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },

  row: { flexDirection: "row", alignItems: "center" },

  input: {
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: "#fff",
    marginRight: 8,
  },

  removeBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#ffe5e5",
    alignItems: "center",
    justifyContent: "center",
  },
  removeBtnText: { color: "#cc0000", fontSize: 12, fontWeight: "700" },
  disabled: { opacity: 0.3 },

  addExerciseBtn: { marginTop: 8, alignSelf: "flex-start" },
  addExerciseBtnText: { color: "#001eff", fontSize: 13, fontWeight: "600" },

  addGroupBtn: { marginTop: 12, alignSelf: "flex-start" },
  addGroupBtnText: { color: "#001eff", fontSize: 13, fontWeight: "600" },

  actions: { flexDirection: "row", gap: 12, marginTop: 8 },
  addDayBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#001eff",
    alignItems: "center",
  },
  addDayBtnText: { color: "#001eff", fontWeight: "700", fontSize: 15 },
  saveBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: "#001eff",
    alignItems: "center",
  },
  saveBtnText: { color: "#fff", fontWeight: "700", fontSize: 15 },
});
