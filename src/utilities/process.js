import { Optional } from "./optional";

const processes = new Map();

export const Process = {
  store: null,
  create: (dependencies, handler, key) => {
    // To Support: Process.create(() => async() => {...}, 'MyProcess')
    if (dependencies instanceof Function) {
      key = handler;
      handler = dependencies;
      dependencies = [];
    }

    if (!key) throw new Error('Process key is required');
    const type = `@@Process -- ${key}`;
    processes.set(type, { dependencies, handler });
    return dispatch => async (...args) => dispatch({ type, payload: args });
  },

  register: store => next => {
    const dispatch = action => {
      const target = processes.get(action.type);
      return Optional.of(target)
        .map(process => {
          if (process.builtDependencies === undefined) {
            process.builtDependencies = process.dependencies.map(builder => builder(dispatch));
          }
          const state = process.handler.length !== process.builtDependencies ? store.getState() : null;
          return process.handler(...process.builtDependencies, state)(...action.payload);
        })
        .orElseGet(() => next(action));
    };

    return dispatch;
  },
};