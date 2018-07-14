import { createActionBuilderFactory } from "./models";

let dispatch = () => {
  throw new Error("Module action does not register in store");
};

export const ModuleActions = {
  create: (prefix, actions) => {
    const buildTaskAction = createActionBuilderFactory(prefix);
    return Object.keys(actions).reduce((map, action) => ({
      ...map,
      [action]: buildTaskAction(actions[action])
    }), {});
  },

  registerDispatch: fn => dispatch = fn
};
