import { describe, expect, it, jest } from '@jest/globals';

describe('database migration', () => {
  it('creates the workout tables and relationships', () => {
    jest.resetModules();

    const execSync = jest.fn();

    jest.doMock('@/utils/db/client', () => ({
      db: { execSync },
    }));

    jest.isolateModules(() => {
      const { initDatabase } = require('@/utils/db/migration');

      initDatabase();
    });

    expect(execSync).toHaveBeenCalledTimes(1);

    const migrationSql = String(execSync.mock.calls[0][0]);

    expect(migrationSql).toContain('CREATE TABLE IF NOT EXISTS split_day');
    expect(migrationSql).toContain('order_index INTEGER NOT NULL UNIQUE');
    expect(migrationSql).toContain('CREATE TABLE IF NOT EXISTS muscle_group');
    expect(migrationSql).toContain('CREATE TABLE IF NOT EXISTS exercise');
    expect(migrationSql).toContain('CREATE TABLE IF NOT EXISTS workout_log');
    expect(migrationSql).toContain('CREATE TABLE IF NOT EXISTS complete_exercise');
    expect(migrationSql).toContain('UNIQUE(date)');
    expect(migrationSql).toContain('FOREIGN KEY (split_day) REFERENCES split_day(id)');
    expect(migrationSql).toContain('FOREIGN KEY (exercise) REFERENCES exercise(id)');
  });
});
