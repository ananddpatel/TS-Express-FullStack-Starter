
export class SpringLikeUtils {
  static getSpringLikeRegistry(): Map<string, Function> {
  // static getSpringLikeRegistry(): {[id:string]: Function} {
    const g = <any>global;
    g.__SPRING_LIKE_CONTAINER__ =
      g.__SPRING_LIKE_CONTAINER__ || {};
    return g.__SPRING_LIKE_CONTAINER__;
  }
  
  static getSpringLikeRequestMapping(): Map<string, [string, Function]> {
    const g = <any>global;
    g.__SPRING_LIKE_CONTAINER_REQUEST_MAPPINGS__ =
      g.__SPRING_LIKE_CONTAINER_REQUEST_MAPPINGS__ ||
      new Map<string, [string, Function]>();
    return g.__SPRING_LIKE_CONTAINER_REQUEST_MAPPINGS__;
  }
  
  static InstanceFactory<T>(ctor, params: any[] = []): T {
    return new ctor(...params);
  }
  
  static getAutoWireableName(target): string {
    const className = target.constructor.name
    return className.charAt(0).toLowerCase() + className.slice(1)
  }
  
  static getDelayedInjectionQueue(): Array<Array<string>> {
    const g = <any>global;
    g.__DELAYED_INJECTION_QUEUE__ =
      g.__DELAYED_INJECTION_QUEUE__ || [];
    return g.__DELAYED_INJECTION_QUEUE__;
  }
}
