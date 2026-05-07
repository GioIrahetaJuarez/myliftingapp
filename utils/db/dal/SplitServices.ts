import { db } from "../client";

type SplitDayInput = {
    name: string
};

type MuscleGroupInput = {
    name: string;
};

type ExerciseInput = {
    name: string;
};

// GET ===============================
export async function getTotalSplitDays() {
    const total = await db.getFirstAsync<{count: number}>(
        'SELECT COUNT(*) as count FROM split_day'
    );
    return total?.count ?? 0;
}

export async function getSplitDay(orderIndex: number) {
    const result = await db.getFirstAsync(
        'SELECT * FROM split_day WHERE order_index = ?',
        [orderIndex]
    );
    if (!result) {
        throw new Error(`Split day not found at order index ${orderIndex}`);
    }
    return result;
}

// SET ===============================
async function clearSplitDayChildren(splitDayId: number) {
    await db.runAsync(
        `DELETE FROM exercise
         WHERE muscle_group IN (
            SELECT id FROM muscle_group WHERE split_day = ?
         )`,
        [splitDayId]
    );
    await db.runAsync('DELETE FROM muscle_group WHERE split_day = ?', [splitDayId]);
}

async function clearMuscleGroupChildren(muscleGroupId: number) {
    await db.runAsync(
        'DELETE FROM exercise WHERE muscle_group = ?',
        [muscleGroupId]
    );
}

// --- Split Day -----------------------------------

export async function createSplitDay(day: SplitDayInput, orderIndex: number) {
    const splitDayResult = await db.runAsync(
        'INSERT INTO split_day (name, order_index) VALUES (?, ?)',
        [day.name, orderIndex]
    );
    return splitDayResult.lastInsertRowId;
}

export async function updateSplitDay(splitDayId: number, newName: string) {
    await db.runAsync(
        'UPDATE split_day SET name = ? WHERE id = ?',
        [newName, splitDayId]
    );
}

export async function deleteSplitDay(splitDayId: number) {
    await clearSplitDayChildren(splitDayId);
    await db.runAsync('DELETE FROM split_day WHERE id = ?', [splitDayId]);
}

// ---- Muscle Groups ------------------------------
export async function createMuscleGroup(muscleGroup: MuscleGroupInput, splitDayId: number) {
    const muscleGroupResult = await db.runAsync(
        'INSERT INTO muscle_group (name, split_day) VALUES (?, ?)',
        [muscleGroup.name, splitDayId]
    );
    return muscleGroupResult.lastInsertRowId;
}

export async function updateMuscleGroup(muscleGroupId: number, newName: string) {
    await db.runAsync(
        'UPDATE muscle_group SET name = ? WHERE id = ?',
        [newName, muscleGroupId]
    );
}

export async function deleteMuscleGroup(muscleGroupId: number) {
    await clearMuscleGroupChildren(muscleGroupId);
    await db.runAsync('DELETE FROM muscle_group WHERE id = ?', [muscleGroupId]);
}

// ---- Exercises ----------------------------------

export async function createExercise(exercise: ExerciseInput, muscleGroupId: number) {
    const exerciseResult = await db.runAsync(
        'INSERT INTO exercise (name, muscle_group) VALUES (?, ?)',
        [exercise.name, muscleGroupId]
    );
    return exerciseResult.lastInsertRowId;
}

export async function updateExercise(exerciseId: number, newName: string) {
    await db.runAsync(
        'UPDATE exercise SET name = ? WHERE id = ?',
        [newName, exerciseId]
    );
}

export async function deleteExercise(exerciseId: number) {
    await db.runAsync('DELETE FROM exercise WHERE id = ?', [exerciseId]);
}
