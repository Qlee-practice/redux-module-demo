export const makePromise = () => next => action => {
  const payload = action.payload || null;
  return Promise.resolve(payload).then(resolved => next({ ...action, payload: resolved }));
};