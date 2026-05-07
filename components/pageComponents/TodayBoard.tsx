import { Link } from "expo-router";
import { Pressable, ScrollView, Text } from 'react-native';

import useWorkout from '../../hooks/useWorkout';
import MuscleGroup from "./MuscleGroup";
import styles from './TodayBoard.styles';

function TodayBoard() {
    const {
        dayName,
        currentWorkout,
        completedExercises,
        workoutPlan,
        handleSkip,
        handleFinished,
        isExerciseHidden,
    } = useWorkout();
    
    const todayWorkoutData = workoutPlan.find(w => w.name === currentWorkout);

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
            <Link href='/Stats' style={styles.statsLink}>Stats</Link>
        </ScrollView>
    );
}

export default TodayBoard;
