export const innerFunc = function(target: Function) {
  const registry: Map<string, Function> = (<any>global).__SPRING_LIKE_CONTAINER__ || new Map<string, Function>();
  const dependency = registry.get(name);
  if (!dependency) {
    registry.set(name, target);
    console.log(registry.get(name).length);
    console.log(registry.get(name));
  }
};