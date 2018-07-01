export const createActionBuilderFactory = prefix => type => {
  const actionType = `@@${prefix}--${type}`;

  const action = dispatch => (...args) => {
    return dispatch({ type: actionType, payload: args });
  };

  Object.defineProperty(action, 'toString', { value: () => actionType });
  return action;
};


export const combineDispatchToAction = actions => dispatch => {
  return Object.keys(actions).reduce((map, key) => {
    return { ...map, [key]: actions[key](dispatch) };
  }, {});
};

export const toHandler = (target, initialState) => (state = initialState, action) => {
  const handler = target[action.type];
  return handler ? handler(state, ...action.payload) : state;
};
