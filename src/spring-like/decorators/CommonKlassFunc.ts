import { SpringLikeUtils as SLU } from "../SpringLikeUtils";


export function klassFunc(name: string) {
  return function (target: Function) {
    const registry = SLU.getSpringLikeRegistry();
    const dependency = registry[name];
    const queue = SLU.getDelayedInjectionQueue();
    if (!dependency) {
      registry[name] = SLU.InstanceFactory(target);
    }
    queue.forEach((item, i, arr) => {
      const [where, propName] = item;
      if (registry[propName]) {
        registry[where][propName] = registry[propName];
        arr.splice(i, 1);
      }
    });
  };
}
