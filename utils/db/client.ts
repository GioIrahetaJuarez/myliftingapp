import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabaseSync('workout.db');
db.execSync('PRAGMA foreign_keys = ON;');
