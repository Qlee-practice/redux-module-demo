import { Optional } from "./optional";


const processes = [];

export const Process = {
  store: null,
  create: (dependencies, handler, key) => {
    if (!key) throw new Error('Process key is required');
    const type = `@@Process -- ${key}`;
    processes.push({ type, dependencies, handler });
    return dispatch => async (...args) => dispatch({ type, payload: args });
  },

  register: store => next => {
    const processMap = {};

    const dispatch = action => {
      const handler = processMap[action.type];
      return Optional.of(handler)
        .map(run => run(action))
        .orElseGet(() => next(action));
    };

    processes.forEach(({ type, dependencies, handler }) => {
      const actions = dependencies.map(builder => builder(dispatch));
      processMap[type] = (action) => handler(...actions, store.getState())(...action.payload);
    });

    return dispatch;
  },
};