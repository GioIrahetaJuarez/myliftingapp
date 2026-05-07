import { describe, expect, it, jest } from '@jest/globals';

describe('SQLite client', () => {
  it('opens the workout database and enables foreign keys', () => {
    jest.resetModules();

    const execSync = jest.fn();
    const openDatabaseSync = jest.fn(() => ({ execSync }));

    jest.doMock('expo-sqlite', () => ({
      openDatabaseSync,
    }));

    jest.isolateModules(() => {
      require('@/utils/db/client');
    });

    expect(openDatabaseSync).toHaveBeenCalledWith('workout.db');
    expect(execSync).toHaveBeenCalledWith('PRAGMA foreign_keys = ON;');
  });
});
