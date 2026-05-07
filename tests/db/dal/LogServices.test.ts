import { describe, expect, it, jest } from '@jest/globals';

const loadLogServices = (getFirstAsync = jest.fn()) => {
  jest.resetModules();
  jest.doMock('@/utils/db/client', () => ({
    db: { getFirstAsync },
  }));

  let services;

  jest.isolateModules(() => {
    services = require('@/utils/db/dal/LogServices');
  });

  return services;
};

describe('LogServices DAL', () => {
  it('returns the most recent workout session', async () => {
    const mockSession = {
      id: 4,
      split_day: 2,
      date: '2026-05-04',
    };
    const getFirstAsync = jest.fn().mockResolvedValue(mockSession);
    const { getLastSession } = loadLogServices(getFirstAsync);

    await expect(getLastSession()).resolves.toEqual(mockSession);

    expect(String(getFirstAsync.mock.calls[0][0]).replace(/\s+/g, ' ').trim()).toBe(
      'SELECT * FROM workout_log ORDER BY date DESC LIMIT 1'
    );
  });

  it('returns null when no workout sessions exist', async () => {
    const getFirstAsync = jest.fn().mockResolvedValue(null);
    const { getLastSession } = loadLogServices(getFirstAsync);

    await expect(getLastSession()).resolves.toBeNull();
  });
});
