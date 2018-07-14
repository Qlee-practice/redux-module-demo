import { Optional } from "./optional";


let dispatch = () => {
  throw new Error("Process does not register in store");
};

const processMap = new Map();

export const Process = {
  create: (handler, key) => {
    const type = Symbol(key);
    const fn = (store, action) => handler(store.getState())(...action.payload);
    processMap.set(type, fn);
    return async (...args) => dispatch({ type, payload: args });
  },

  register: store => next => {
    dispatch = async action => {
      const handler = processMap.get(action.type);
      return Optional.of(handler)
        .map(run => run(store, action))
        .orElseGet(() => next(action));
    };

    return dispatch;
  },
};