import { describe, expect, it, jest } from '@jest/globals';

type AsyncDbMock = jest.Mock<(...args: unknown[]) => Promise<unknown>>;

const createAsyncMock = () => jest.fn<(...args: unknown[]) => Promise<unknown>>();

const loadSplitServices = (
  getFirstAsync: AsyncDbMock = createAsyncMock(),
  runAsync: AsyncDbMock = createAsyncMock()
) => {
  jest.resetModules();
  jest.doMock('@/utils/db/client', () => ({
    db: { getFirstAsync, runAsync },
  }));

  let services = {} as Record<string, (...args: unknown[]) => unknown>;

  jest.isolateModules(() => {
    services = require('@/utils/db/dal/SplitServices');
  });

  return { services, getFirstAsync, runAsync };
};

describe('SplitServices DAL', () => {
  describe('getTotalSplitDays', () => {
    it('returns the total number of split days', async () => {
      const getFirstAsync = createAsyncMock().mockResolvedValue({ count: 3 });
      const { services } = loadSplitServices(getFirstAsync);

      await expect(services.getTotalSplitDays()).resolves.toBe(3);
      expect(getFirstAsync).toHaveBeenCalledWith(
        'SELECT COUNT(*) as count FROM split_day'
      );
    });

    it('returns 0 when there are no split days', async () => {
      const getFirstAsync = createAsyncMock().mockResolvedValue(null);
      const { services } = loadSplitServices(getFirstAsync);

      await expect(services.getTotalSplitDays()).resolves.toBe(0);
    });
  });

  describe('getSplitDay', () => {
    it('gets a split day by order index', async () => {
      const mockSplitDay = { id: 2, name: 'Pull', order_index: 1 };
      const getFirstAsync = createAsyncMock().mockResolvedValue(mockSplitDay);
      const { services } = loadSplitServices(getFirstAsync);

      await expect(services.getSplitDay(1)).resolves.toEqual(mockSplitDay);
      expect(getFirstAsync).toHaveBeenCalledWith(
        'SELECT * FROM split_day WHERE order_index = ?',
        [1]
      );
    });

    it('throws when the split day does not exist', async () => {
      const getFirstAsync = createAsyncMock().mockResolvedValue(null);
      const { services } = loadSplitServices(getFirstAsync);

      await expect(services.getSplitDay(99)).rejects.toThrow(
        'Split day not found at order index 99'
      );
    });
  });

  describe('createSplitDay', () => {
    it('creates a split day and returns the generated id', async () => {
      const runAsync = createAsyncMock().mockResolvedValue({ lastInsertRowId: 10 });
      const { services } = loadSplitServices(createAsyncMock(), runAsync);

      await expect(services.createSplitDay({ name: 'Push' }, 0)).resolves.toBe(10);
      expect(runAsync).toHaveBeenCalledWith(
        'INSERT INTO split_day (name, order_index) VALUES (?, ?)',
        ['Push', 0]
      );
    });
  });

  describe('updateSplitDay', () => {
    it('renames a split day by id', async () => {
      const runAsync = createAsyncMock().mockResolvedValue({});
      const { services } = loadSplitServices(createAsyncMock(), runAsync);

      await services.updateSplitDay(5, 'Pull');

      expect(runAsync).toHaveBeenCalledWith(
        'UPDATE split_day SET name = ? WHERE id = ?',
        ['Pull', 5]
      );
    });
  });

  describe('deleteSplitDay', () => {
    it('deletes a split day and its child rows by split day id', async () => {
      const runAsync = createAsyncMock().mockResolvedValue({});
      const { services } = loadSplitServices(createAsyncMock(), runAsync);

      await services.deleteSplitDay(7);

      expect(runAsync).toHaveBeenNthCalledWith(
        1,
        `DELETE FROM exercise
         WHERE muscle_group IN (
            SELECT id FROM muscle_group WHERE split_day = ?
         )`,
        [7]
      );
      expect(runAsync).toHaveBeenNthCalledWith(
        2,
        'DELETE FROM muscle_group WHERE split_day = ?',
        [7]
      );
      expect(runAsync).toHaveBeenNthCalledWith(
        3,
        'DELETE FROM split_day WHERE id = ?',
        [7]
      );
    });
  });

  describe('createMuscleGroup', () => {
    it('creates a muscle group for a split day and returns the generated id', async () => {
      const runAsync = createAsyncMock().mockResolvedValue({ lastInsertRowId: 20 });
      const { services } = loadSplitServices(createAsyncMock(), runAsync);

      await expect(services.createMuscleGroup({ name: 'Chest' }, 7)).resolves.toBe(20);
      expect(runAsync).toHaveBeenCalledWith(
        'INSERT INTO muscle_group (name, split_day) VALUES (?, ?)',
        ['Chest', 7]
      );
    });
  });

  describe('updateMuscleGroup', () => {
    it('renames a muscle group by id', async () => {
      const runAsync = createAsyncMock().mockResolvedValue({});
      const { services } = loadSplitServices(createAsyncMock(), runAsync);

      await services.updateMuscleGroup(20, 'Shoulders');

      expect(runAsync).toHaveBeenCalledWith(
        'UPDATE muscle_group SET name = ? WHERE id = ?',
        ['Shoulders', 20]
      );
    });
  });

  describe('deleteMuscleGroup', () => {
    it('deletes a muscle group and its exercises by muscle group id', async () => {
      const runAsync = createAsyncMock().mockResolvedValue({});
      const { services } = loadSplitServices(createAsyncMock(), runAsync);

      await services.deleteMuscleGroup(20);

      expect(runAsync).toHaveBeenNthCalledWith(
        1,
        'DELETE FROM exercise WHERE muscle_group = ?',
        [20]
      );
      expect(runAsync).toHaveBeenNthCalledWith(
        2,
        'DELETE FROM muscle_group WHERE id = ?',
        [20]
      );
    });
  });

  describe('createExercise', () => {
    it('creates an exercise for a muscle group and returns the generated id', async () => {
      const runAsync = createAsyncMock().mockResolvedValue({ lastInsertRowId: 30 });
      const { services } = loadSplitServices(createAsyncMock(), runAsync);

      await expect(services.createExercise({ name: 'Bench Press' }, 20)).resolves.toBe(30);
      expect(runAsync).toHaveBeenCalledWith(
        'INSERT INTO exercise (name, muscle_group) VALUES (?, ?)',
        ['Bench Press', 20]
      );
    });
  });

  describe('updateExercise', () => {
    it('renames an exercise by id', async () => {
      const runAsync = createAsyncMock().mockResolvedValue({});
      const { services } = loadSplitServices(createAsyncMock(), runAsync);

      await services.updateExercise(30, 'Incline Bench Press');

      expect(runAsync).toHaveBeenCalledWith(
        'UPDATE exercise SET name = ? WHERE id = ?',
        ['Incline Bench Press', 30]
      );
    });
  });

  describe('deleteExercise', () => {
    it('deletes an exercise by id', async () => {
      const runAsync = createAsyncMock().mockResolvedValue({});
      const { services } = loadSplitServices(createAsyncMock(), runAsync);

      await services.deleteExercise(30);

      expect(runAsync).toHaveBeenCalledWith(
        'DELETE FROM exercise WHERE id = ?',
        [30]
      );
    });
  });
});
