export function Service(name: string = null) {
  // console.log(name);
  return function(target: Function) {
    (<any>global).__SPRING_LIKE_CONTAINER__ = (<any>global).__SPRING_LIKE_CONTAINER__ || {};
    const registry = (<any>global).__SPRING_LIKE_CONTAINER__;
    
    const dependency = registry[name];

    if (!dependency) {
      registry[name] = target;
      registry[name] = Object.create(registry[name]) 
      console.log(name, registry[name], target, typeof target);
    }
    
  };
}
