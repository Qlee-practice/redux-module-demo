import { combineReducers } from "redux";
import { createSelector } from "reselect";
import { combineDispatchToAction, createActionBuilderFactory, toReducer } from "../utilities/models";


const TASK_NAME = 'tasks';

const buildTaskAction = createActionBuilderFactory(TASK_NAME);

const taskActions = {
  add: buildTaskAction('add'),
  patch: buildTaskAction('patch')
};

const taskDataReducer = toReducer({
  [taskActions.add]: (state, task) => {
    return { ...state, [task.id]: task };
  },
  [taskActions.patch]: (state, task) => {
    const prevTask = state[task.id];
    return { ...state, [task.id]: { ...prevTask, ...task } };
  }
}, {});

const taskListReducer = toReducer({
  [taskActions.add]: (state, task) => {
    return [...state, task.id];
  }
}, []);


const taskReducers = combineReducers({
  data: taskDataReducer,
  list: taskListReducer
});

const getList = state => state[TASK_NAME].list;
const getDate = state => state[TASK_NAME].data;

const taskSelector = {
  tasks: createSelector(
    [getList, getDate],
    (list, data) => list.map(id => data[id])
  ),
  task: taskId => state => state[TASK_NAME].data[taskId]
};

export const TaskModule = {
  name: TASK_NAME,
  actions: combineDispatchToAction(taskActions),
  reducers: taskReducers,
  selector: taskSelector
};



