import { getSpringLikeRequestMapping, getSpringLikeRegistry } from "../util";

export function RequestMapping(path: string, type: "get" | "post") {
  const name = "homeController";

  return function(
    target,
    propertyName: string,
    propertyDesciptor: PropertyDescriptor
  ) {
    const reqMap = getSpringLikeRequestMapping();

    const mapping = reqMap.get(path);
    if (!mapping) {
      // console.log(path, type, propertyDesciptor, target, propertyName);
      const registry = getSpringLikeRegistry();

      const dependency = registry[name];

      if (!dependency) {
        registry[name] = target;
        registry[name] = Object.create(registry[name]);
      }
      // look inside __SPRING_LIKE_CONTAINER__ for the intiatlized class and give that guy's method otherwise it wont know and will say things are undefined
      reqMap.set(path, [type, registry[name][propertyName]]);
    }
  };
}
