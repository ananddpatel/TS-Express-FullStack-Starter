export function getSpringLikeRegistry(): Map<string, Function> {
  (<any>global).__SPRING_LIKE_CONTAINER__ =
    (<any>global).__SPRING_LIKE_CONTAINER__ || {};
  return (<any>global).__SPRING_LIKE_CONTAINER__;
}

export function getSpringLikeRequestMapping(): Map<string, [string, Function]> {
  (<any>global).__SPRING_LIKE_CONTAINER_REQUEST_MAPPINGS__ =
    (<any>global).__SPRING_LIKE_CONTAINER_REQUEST_MAPPINGS__ ||
    new Map<string, [string, Function]>();
  return (<any>global).__SPRING_LIKE_CONTAINER_REQUEST_MAPPINGS__;
}

export function InstanceFactory(ctor, params: any[]) {
  return new ctor(...params);
}
