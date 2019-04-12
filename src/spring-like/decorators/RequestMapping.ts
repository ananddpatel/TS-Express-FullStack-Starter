import { SpringLikeUtils as SLU } from "../SpringLikeUtils";


export function RequestMapping(path: string, httpMethod: 'get' | 'post', middlewares: Array<any> = []) {
  return registerRequestMapping(path, httpMethod, middlewares);
}
export function GetMapping(path: string, middlewares: Array<any> = []) {
  return registerRequestMapping(path, 'get', middlewares);
}
export function PostMapping(path: string, middlewares: Array<any> = []) {
  return registerRequestMapping(path, 'post', middlewares);
}


function registerRequestMapping(path: string, httpMethod: string, middlewares: Array<any>) {
  return function (target, propertyName: string, propertyDesciptor: PropertyDescriptor) {
    const reqMap = SLU.getSpringLikeRequestMapping();
    const name = SLU.getAutoWireableName(target);
    const mapping = reqMap.get(path);
    if (!mapping) {
      const registry = SLU.getSpringLikeRegistry();
      const dependency = registry.get(name);
      if (!dependency) {
        registry.set(name, SLU.InstanceFactory(target.constructor));
      }
      const method = propertyDesciptor.value;
      propertyDesciptor.value = (...args: any[]) => {
        const result = method.apply(registry.get(name), args);
        return result;
      };
      reqMap.set(path, [httpMethod, propertyDesciptor.value, middlewares]);
    }
  };
}

