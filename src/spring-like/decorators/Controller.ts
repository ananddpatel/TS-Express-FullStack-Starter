import { getSpringLikeRegistry, InstanceFactory } from "../util";

export function Controller(name: string = null) {
  // console.log(name);
  return function(target: Function) {
    const registry = getSpringLikeRegistry();

    const dependency = registry[name];

    if (!dependency) {
      if (!registry[name]) {
        registry[name] = InstanceFactory(target, []);
      }

      // console.log(registry[name].length);
      // console.log(registry[name]);
    }

    // console.log((<any>global).__SPRING_LIKE_CONTAINER__);
  };
}
