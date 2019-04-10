import { getSpringLikeRegistry, InstanceFactory } from "../util";

export function Repository(name: string = null) {
  // console.log(name);
  return function(target: Function) {
    const registry = getSpringLikeRegistry();

    const dependency = registry[name];

    if (!dependency) {
      if (!registry[name]) {
        registry[name] = InstanceFactory(target, []);
      }
    }
  };
}
