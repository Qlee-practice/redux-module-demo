export const Process = {
  create(dependencies, handler, key) {
    const name = `@@Process -- ${key}`;
    const processAction = dispatch => async (...args) => dispatch({ type: name, payload: args });
    const watcher = async (state, dispatch, action) => {
      const actions = dependencies.map(builder => builder(dispatch));
      return handler(...actions, state).apply(null, action.payload)
    };
    return {
      name,
      action: processAction,
      watcher,
    }
  }
};