import { db } from './client';

export const initDatabase = () => {
   db.execSync(`
    --Split Plan ------------------------------------------
    CREATE TABLE IF NOT EXISTS split_day (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        order_index INTEGER NOT NULL UNIQUE
    );

    CREATE TABLE IF NOT EXISTS muscle_group (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        split_day INTEGER,
        FOREIGN KEY (split_day) REFERENCES split_day(id)
    );

    CREATE TABLE IF NOT EXISTS exercise (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        muscle_group INTEGER,
        FOREIGN KEY (muscle_group) REFERENCES muscle_group(id)
    );

    --History log ----------------------------------------
    CREATE TABLE IF NOT EXISTS workout_log (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      split_day TEXT NOT NULL,
      date TEXT NOT NULL,
      UNIQUE(date),
      FOREIGN KEY (split_day) REFERENCES split_day(name)
    );

    CREATE TABLE IF NOT EXISTS complete_exercise (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      workout_log_id INTEGER,
      exercise INTEGER,
      sets INTEGER NOT NULL,
      reps INTEGER NOT NULL,
      weight REAL NOT NULL,
      FOREIGN KEY (workout_log_id) REFERENCES workout_log(id),
      FOREIGN KEY (exercise) REFERENCES exercise(id)
    );
  `); 
}