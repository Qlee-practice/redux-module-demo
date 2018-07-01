import { combineReducers } from "redux";
import { createSelector } from "reselect";
import { combineDispatchToAction, createActionBuilderFactory, toReducer } from "../utilities/models";


const TASK_NAME = 'tasks';

const buildTaskAction = createActionBuilderFactory(TASK_NAME);

const taskActions = {
  create: buildTaskAction('create')
};

const taskDataReducer = toReducer({
  [taskActions.create]: (state, task) => {
    return { ...state, [task.id]: task };
  }
}, {});

const taskListReducer = toReducer({
  [taskActions.create]: (state, task) => {
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
  )
};

export const TaskModule = {
  name: TASK_NAME,
  actions: combineDispatchToAction(taskActions),
  reducers: taskReducers,
  selector: taskSelector
};



