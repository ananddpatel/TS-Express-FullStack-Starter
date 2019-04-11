import { SpringLikeUtils as SLU } from "../SpringLikeUtils";

export function Component(name: string = null) {
  return klassFunc(name);
}

export function Service(name: string = null) {
  return klassFunc(name);
}

export function Repository(name: string = null) {
  return klassFunc(name);
}

export function Controller(name: string = null) {
  return klassFunc(name);
}

export function klassFunc(name: string) {
  return function (target: Function) {
    const registry = SLU.getSpringLikeRegistry();
    const dependency = registry[name];
    const queue = SLU.getDelayedInjectionQueue();
    if (!dependency) {
      registry.set(name, SLU.InstanceFactory(target));
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