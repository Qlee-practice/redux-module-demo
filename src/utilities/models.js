export const toReducer = (target, initialState) => (state = initialState, action) => {
  const handler = target[action.type];
  return handler ? handler(state, ...action.payload) : state;
};
