export function RequestMapping(path: string, type: 'get' | 'post') {

  const name = 'homeController'
  
  return function(target, propertyName: string, propertyDesciptor: PropertyDescriptor) {
    (<any>global).__SPRING_LIKE_CONTAINER_REQUEST_MAPPINGS__ = (<any>global).__SPRING_LIKE_CONTAINER_REQUEST_MAPPINGS__ || new Map<string, [string, Function]>();
    const reqMap = (<any>global).__SPRING_LIKE_CONTAINER_REQUEST_MAPPINGS__;
  
    const mapping = reqMap.get(path);
    if (!mapping) {
      // console.log(path, type, propertyDesciptor, target, propertyName);
      (<any>global).__SPRING_LIKE_CONTAINER__ = (<any>global).__SPRING_LIKE_CONTAINER__ || {};
      const registry = (<any>global).__SPRING_LIKE_CONTAINER__;

      const dependency = registry[name];

      if (!dependency) {
        registry[name] = target;
        registry[name] = Object.create(registry[name]);
      }
      // look inside __SPRING_LIKE_CONTAINER__ for the intiatlized class and give that guy's method otherwise it wont know and will say things are undefined
      reqMap.set(path, [type, registry[name][propertyName]]);
    }
  }
}