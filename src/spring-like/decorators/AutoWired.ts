import { SpringLikeUtils as SLU } from "../SpringLikeUtils";

export function AutoWired(target, propertyKey: string) {
  const registry = SLU.getSpringLikeRegistry();
  const queue = SLU.getDelayedInjectionQueue();
  const instance = SLU.InstanceFactory(target.constructor);
  if (registry.get(propertyKey)) {
    instance[propertyKey] = registry[propertyKey]
  } else {
    queue.push([SLU.getAutoWireableName(target), propertyKey])
  }
  registry[SLU.getAutoWireableName(target)] = instance;
}
