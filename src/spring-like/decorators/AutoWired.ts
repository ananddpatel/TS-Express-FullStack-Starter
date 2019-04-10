import { getSpringLikeRegistry } from "../util";

export function AutoWire(name) {
  return function(target, propertyKey: string) {
    const registry = getSpringLikeRegistry();
    if (registry[name]) {
      registry[name][propertyKey] = registry[propertyKey];
      console.log(name, "found", target[propertyKey]);
    } else {
      //  create it and store it inside registry then set it
      console.log(name, "not found", target[propertyKey], registry[name]);
    }
  };
}
