import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link } from "expo-router";
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import workoutPlanDefault from '../../assets/jsonPref/workoutPlan';

// Helper functions -------------------------------------------------------------------
const getWorkoutCycle = async () => {
    const storedWorkoutPlan = await AsyncStorage.getItem('workoutPlan');
    const data = storedWorkoutPlan ? JSON.parse(storedWorkoutPlan) : workoutPlanDefault;
    return data.map(w => w.splitDay);
};

const loadWorkoutPlan = async () => {
    const storedWorkoutPlan = await AsyncStorage.getItem('workoutPlan');
    const data = storedWorkoutPlan ? JSON.parse(storedWorkoutPlan) : workoutPlanDefault;
    return data;
};

const getNextWorkout = async (currentWorkout) => {
    const cycle = await getWorkoutCycle();
    const currentIndex = cycle.indexOf(currentWorkout);
    const nextIndex = (currentIndex + 1) % cycle.length;
    return cycle[nextIndex];
};

const saveWorkoutToStorage = async (workout, date) => {
    await AsyncStorage.setItem('lastWorkout', workout);
    await AsyncStorage.setItem('lastWorkoutDate', date);
};

const loadWorkoutFromStorage = async () => {
    return {
        workout: await AsyncStorage.getItem('lastWorkout'),
        date: await AsyncStorage.getItem('lastWorkoutDate')
    };
};

const saveCompletedExercises = async (exercises, workout, date) => {
    const data = {
        exercises: exercises,
        splitDay: workout,
        date: date
    };
    await AsyncStorage.setItem('completedExercises', JSON.stringify(data));
};

const loadCompletedExercises = async (currentWorkout, todayString) => {
    const stored = await AsyncStorage.getItem('completedExercises');
    if (!stored) return [];
    const data = JSON.parse(stored);
    if (data.splitDay === currentWorkout && data.date === todayString) {
        return data.exercises;
    }
    return [];
};

const logPreviousWorkout = async () => {
    try {
        const prevExercise = await AsyncStorage.getItem('completedExercises');
        const parsedExercises = JSON.parse(prevExercise);
        const existingLog = await AsyncStorage.getItem('workoutLog');
        const workoutLog = existingLog ? JSON.parse(existingLog) : [];
        const index = workoutLog.findIndex((obj) => obj.date === parsedExercises.date);
        if (index !== -1) {
            workoutLog[index] = parsedExercises;
        } else {
            workoutLog.push(parsedExercises);
        }
        await AsyncStorage.setItem('workoutLog', JSON.stringify(workoutLog));
    } catch (error) {
        console.error('Error in logPreviousWorkout:', error);
    }
};

// Today Board Component -----------------------------------------------------
function TodayBoard() {
    const [currentWorkout, setCurrentWorkout] = useState('Push');
    const [completedExercises, setCompletedExercises] = useState([]);
    const [workoutPlan, setWorkoutPlan] = useState([]);

    const today = new Date();
    const todayString = today.toISOString().split('T')[0];
    const dayName = today.toLocaleDateString('en-US', { weekday: 'long' });

    const todayWorkoutData = workoutPlan.find(w => w.splitDay === currentWorkout);

    // Initialize workout on mount
    useEffect(() => {
        const init = async () => {
            const plan = await loadWorkoutPlan();
            setWorkoutPlan(plan);

            const { workout: savedWorkout, date: savedDate } = await loadWorkoutFromStorage();

            // Same day - use saved workout
            if (savedDate === todayString && savedWorkout) {
                setCurrentWorkout(savedWorkout);
                const saved = await loadCompletedExercises(savedWorkout, todayString);
                setCompletedExercises(saved);
                return;
            }

            // New day or first time
            const nextWorkout = savedWorkout ? await getNextWorkout(savedWorkout) : 'Push';
            setCurrentWorkout(nextWorkout);
            await saveWorkoutToStorage(nextWorkout, todayString);
            await AsyncStorage.removeItem('completedExercises');
        };
        init();
    }, [todayString]);

    // Save completed exercises whenever they change
    useEffect(() => {
        const save = async () => {
            if (completedExercises.length > 0) {
                await saveCompletedExercises(completedExercises, currentWorkout, todayString);
                await logPreviousWorkout();
            }
        };
        save();
    }, [completedExercises, currentWorkout, todayString]);

    // Skip to next workout
    const handleSkip = async () => {
        const nextWorkout = await getNextWorkout(currentWorkout);
        setCurrentWorkout(nextWorkout);
        await saveWorkoutToStorage(nextWorkout, todayString);
        await AsyncStorage.removeItem('completedExercises');
    };

    // Mark exercise as finished
    const handleFinished = (groupIndex, exerciseIndex, setsReps) => {
        const exercise = todayWorkoutData.groups[groupIndex].exercises[exerciseIndex];
        const [sets, reps] = setsReps.split('x').map(Number);
        const completedExercise = {
            name: exercise,
            sets: sets,
            reps: reps,
        };
        setCompletedExercises(prev => [...prev, completedExercise]);
    };

    // Check if exercise is hidden
    const isExerciseHidden = (groupIndex, exerciseIndex) => {
        const exerciseName = todayWorkoutData.groups[groupIndex].exercises[exerciseIndex];
        return completedExercises.some(ex => ex.name === exerciseName);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.dayName}>{dayName}</Text>
            <Text style={styles.workoutTitle}>{currentWorkout}</Text>
            <Pressable
                onPress={handleSkip}
                disabled={completedExercises.length > 0}
                style={[styles.button, completedExercises.length > 0 && styles.buttonDisabled]}
            >
                <Text style={styles.buttonText}>Skip to Next Workout</Text>
            </Pressable>

            {todayWorkoutData?.groups.map((group, groupIndex) => (
                <MuscleGroup
                    key={groupIndex}
                    group={group}
                    groupIndex={groupIndex}
                    isExerciseHidden={isExerciseHidden}
                    onFinished={handleFinished}
                />
            ))}
            <Link href='/Stats' style={{ color: 'blue', paddingHorizontal: 8 }}>Stats</Link>
        </ScrollView>
    );
}

// SubComponents -------------------------------------------------------------
function MuscleGroup({ group, groupIndex, isExerciseHidden, onFinished }) {
    return (
        <View style={styles.muscleGroup}>
            <Text style={styles.groupTitle}>{group.group}</Text>
            {group.exercises.map((exercise, exerciseIndex) => (
                <ExerciseItem
                    key={exerciseIndex}
                    exercise={exercise}
                    groupIndex={groupIndex}
                    exerciseIndex={exerciseIndex}
                    isHidden={isExerciseHidden(groupIndex, exerciseIndex)}
                    onFinished={onFinished}
                />
            ))}
        </View>
    );
}

function ExerciseItem({ exercise, groupIndex, exerciseIndex, isHidden, onFinished }) {
    const [setsReps, setSetsReps] = useState('6x12');

    if (isHidden) return null;

    return (
        <View style={styles.exerciseRow}>
            <Text style={styles.exerciseName}>{exercise}</Text>
            <TextInput
                style={styles.input}
                value={setsReps}
                onChangeText={setSetsReps}
            />
            <Pressable
                style={styles.doneButton}
                onPress={() => onFinished(groupIndex, exerciseIndex, setsReps)}
            >
                <Text style={styles.doneButtonText}>Done</Text>
            </Pressable>
            
        </View>
    );
}

export default TodayBoard;

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    dayName: {
        fontSize: 16,
        color: '#888',
        marginBottom: 4,
    },
    workoutTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    button: {
        backgroundColor: '#333',
        padding: 10,
        borderRadius: 8,
        marginBottom: 20,
        alignItems: 'center',
    },
    buttonDisabled: {
        opacity: 0.4,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    muscleGroup: {
        marginBottom: 24,
    },
    groupTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    exerciseRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        gap: 8,
    },
    exerciseName: {
        flex: 1,
        fontSize: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        padding: 6,
        width: 60,
        textAlign: 'center',
    },
    doneButton: {
        backgroundColor: '#4CAF50',
        padding: 8,
        borderRadius: 6,
    },
    doneButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});