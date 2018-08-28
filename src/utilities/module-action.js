const createActionBuilderFactory = prefix => type => {
  const actionType = `@@${prefix}--${type}`;

  const action = dispatch => (...args) => {
    return dispatch({ type: actionType, payload: args });
  };

  Object.defineProperty(action, 'toString', { value: () => actionType });
  return action;
};


export const ModuleActions = {
  create: (prefix, actions) => {
    const buildTaskAction = createActionBuilderFactory(prefix);
    return Object.keys(actions).reduce((map, action) => ({
      ...map,
      [action]: buildTaskAction(action)
    }), {});
  },
};
