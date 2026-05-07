import { db } from "../client";

export async function getLastSession() {
    const lastSession = await db.getFirstAsync(`
        SELECT * FROM workout_log 
        ORDER BY date 
        DESC LIMIT 1
    `);
    return lastSession;
}

export async function getCompletedExercises(workout_entry: object) {
    const exercises = await db.getFirstAsync(`
        SELECT * FROM complete_exercise AS c 
        WHERE c.workout_log_id = ?
        `, [workout_entry.id]);

    return exercises
}
// logExercise()

// logSession()

