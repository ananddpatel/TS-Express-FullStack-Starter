export class ContainerHandler {
  public app: any;
  constructor(app: any) {
    this.app = app;
  }

  public init() {
    const reqMap = (<any>global).__SPRING_LIKE_CONTAINER_REQUEST_MAPPINGS__ as Map<string, [string, Function]>;
    const entries = reqMap.entries();

    for (const item of entries) {
      const [path, callback] = item;
      const [type, handlerFunc] = callback;
      // console.log('handlerFunc', handlerFunc);
      
      this.app[type](path, handlerFunc)
    }

  }
}