import { Optional } from "../utilities/optional";

export const combineProcess = (...processes) => {

  const handlers = processes.reduce((handler, process) => ({
    ...handler,
    [process.name]: process.watcher
  }), {});

  return store => next => {
    const dispatch = action => {
      const handler = handlers[action.type];
      return Optional.of(handler)
        .map(run => run(store.getState(), dispatch, action))
        .orElseGet(() => next(action));
    };
    return dispatch;
  };
};