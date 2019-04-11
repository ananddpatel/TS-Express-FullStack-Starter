import { SpringLikeUtils as SLU } from "../SpringLikeUtils";


export function RequestMapping(path: string, type: 'get' | 'post') {
  return function(target, propertyName: string, propertyDesciptor: PropertyDescriptor) {
    const reqMap = SLU.getSpringLikeRequestMapping();
    const name = SLU.getAutoWireableName(target);
    const mapping = reqMap.get(path);
    if (!mapping) {
      const registry = SLU.getSpringLikeRegistry();
      const dependency = registry[name];
      if (!dependency) {
        registry.set(name, SLU.InstanceFactory(target.constructor));
      }
      const method = propertyDesciptor.value;
      propertyDesciptor.value = (...args: any[]) => {
        const result = method.apply(registry[name], args)
        return result;
      };
      reqMap.set(path, [type, propertyDesciptor.value]);
    }
  };
}
