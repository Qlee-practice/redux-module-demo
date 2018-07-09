import { applyMiddleware, combineReducers, createStore } from 'redux';
import { TaskModule } from '../../models/tasks';
import { Process } from "../../utilities/process";
import { createTask } from "../tasks";
import * as TasksApi from '../../apis/tasks';

jest.mock('../../apis/tasks');

describe('Task Module', () => {

  describe('#createTask', () => {

    const reducers = combineReducers({
      [TaskModule.name]: TaskModule.reducers
    });

    const store = createStore(reducers, applyMiddleware(Process.register));

    it('should add new task to task list', async () => {
      TasksApi.create.mockImplementation(async taskName => ({ id: 1, name: taskName, done: false }));

      TasksApi.toggle.mockReturnValue(Promise.resolve(null));

      const taskName = 'hell world';

      await createTask(store.dispatch)(taskName);

      const tasks = TaskModule.selector.tasks(store.getState());

      expect(tasks).toEqual([{ name: taskName, done: true, id: 1 }]);

      expect(TasksApi.create).toBeCalledWith(taskName);
      expect(TasksApi.toggle).toBeCalledWith(1, true);
    });

  });

});