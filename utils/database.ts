import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('workout.db');

export const initDatabase = () => {
   db.execSync(`
    CREATE TABLE IF NOT EXISTS workout_log (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      split_day TEXT NOT NULL,
      date TEXT NOT NULL,
      UNIQUE(date)
    );

    CREATE TABLE IF NOT EXISTS completed_exercises (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      workout_log_id INTEGER,
      name TEXT NOT NULL,
      sets INTEGER NOT NULL,
      reps INTEGER NOT NULL,
      FOREIGN KEY (workout_log_id) REFERENCES workout_log(id)
    );

    CREATE TABLE IF NOT EXISTS last_workout (
      id INTEGER PRIMARY KEY,
      workout TEXT NOT NULL,
      date TEXT NOT NULL
    );
  `); 
}