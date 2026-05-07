import workoutPlanDefault from '@/assets/jsonPref/workoutPlan';
import { getCompletedExercises, getLastSession } from '@/utils/db/dal/LogServices';
import { getTotalSplitDays } from '@/utils/db/dal/SplitServices';
import { initDatabase } from '@/utils/db/migration';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

type CompletedExercise = {
    name: string;
    sets: number;
    reps: number;
};

type WorkoutSession = {
    id: number;
    split_day: string;
    date: string;
};

// Helper func------------------------------------------------------------------
const getNextWorkoutName = (currentWorkout: string | null, workoutPlan = workoutPlanDefault) => {
    const cycle = workoutPlan.map((workout) => workout.name);

    if (cycle.length === 0) return '';
    if (!currentWorkout) return cycle[0];

    const currentIndex = cycle.indexOf(currentWorkout);
    const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % cycle.length;

    return cycle[nextIndex];
};
// Brain for TodayBoard ---------------------------------------------------------
function useWorkout() {
    const [currentWorkout, setCurrentWorkout] = useState(workoutPlanDefault[0]?.name ?? '');
    const [completedExercises, setCompletedExercises] = useState<CompletedExercise[]>([]);
    const [workoutPlan] = useState(workoutPlanDefault);

    const today = new Date();
    const todayString = today.toISOString().split('T')[0];
    const dayName = today.toLocaleDateString('en-US', { weekday: 'long' });
    const todayWorkoutData = workoutPlan.find((workout) => workout.name === currentWorkout);

    const { push } = useRouter();
    
    useEffect(() => {
        const init = async () => {
            initDatabase();

            const splitCount = await getTotalSplitDays();

            //New user no split configured
            if (splitCount === 0) {
                setCurrentWorkout(workoutPlanDefault[0]?.name ?? '');
                setCompletedExercises([]);
                push('/modal');
                return;
            }

            const lastSession = await getLastSession() as WorkoutSession | null;

            // Return already completed exercises today
            if (lastSession?.date === todayString) {
                setCurrentWorkout(lastSession.split_day);
                setCompletedExercises(await getCompletedExercises(lastSession) as CompletedExercise[]);
                return;
            }

            // New Day
            setCurrentWorkout(getNextWorkoutName(lastSession?.split_day ?? null, workoutPlan));
            setCompletedExercises([]);
        };

        init();
    }, [push, todayString, workoutPlan]);

    const handleSkip = async () => {
        setCurrentWorkout((previousWorkout) => getNextWorkoutName(previousWorkout, workoutPlan));
        setCompletedExercises([]);
    };

    const handleFinished = (groupIndex: number, exerciseIndex: number, setsReps: string) => {
        const exercise = todayWorkoutData?.groups[groupIndex]?.exercises[exerciseIndex];

        if (!exercise) return;

        const [sets, reps] = setsReps.split('x').map(Number);

        setCompletedExercises((previousExercises) => [
            ...previousExercises,
            {
                name: exercise.name,
                sets: Number.isFinite(sets) ? sets : 0,
                reps: Number.isFinite(reps) ? reps : 0,
            },
        ]);
    };

    const isExerciseHidden = (groupIndex: number, exerciseIndex: number) => {
        const exerciseName = todayWorkoutData?.groups[groupIndex]?.exercises[exerciseIndex]?.name;

        return completedExercises.some((exercise) => exercise.name === exerciseName);
    };

    return {
        dayName,
        currentWorkout,
        completedExercises,
        workoutPlan,
        handleSkip,
        handleFinished,
        isExerciseHidden,
    };
};

export default useWorkout;
