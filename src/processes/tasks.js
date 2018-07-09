import { TaskModule } from "../models/tasks";
import * as TaskApi from '../apis/tasks';
import { Process } from "../utilities/process";

export const toggleTask = Process.create(
  [TaskModule.actions],
  (taskActions, state) => async taskId => {
    const task = TaskModule.selector.task(taskId)(state);

    if (!task) throw new Error(`Task ${taskId} not found`);

    await TaskApi.toggle(taskId, !task.done);

    return taskActions.patch({ id: taskId, done: !task.done });
  },
  'ToggleTask'
);


export const createTask = Process.create(
  [TaskModule.actions, toggleTask],
  (taskActions, toggleTask) => async taskName => {
    if (!taskName) throw new Error('Task name can not be empty');

    const task = await TaskApi.create(taskName);

    await taskActions.add(task);

    return toggleTask(task.id);
  },
  'CreateTask'
);
