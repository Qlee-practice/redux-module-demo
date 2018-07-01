let id = 1;
const getId = () => id++;

export const create = async taskName => {
  return {
    id: getId(),
    name: taskName,
    done: false,
  };
};

export const toggle = async (taskId, done) => {
  // throw new Error('Toggle failed for ' + taskId);
  return null;
};