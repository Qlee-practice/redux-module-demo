import { TaskModule } from "../models/tasks";
import * as TaskApi from '../apis/tasks';
import { Process } from "../utilities/process";

export const createTask = Process.create(
  [TaskModule.actions],
  taskActions => async taskName => {
    if (!taskName) throw new Error('Task name can not be empty');

    const task = await TaskApi.create(taskName);
    return taskActions.create(task);
  }
);