import { SpringLikeUtils as SLU } from "./SpringLikeUtils";

export class IoCContainer {
  app: any;
  providers: Function[] = [];

  constructor(app: any) {
    this.app = app;
    return this;
  }

  provide(providers: Array<Function> = []) {
    this.providers = providers;
    return this;
  }

  use(middleware: Array<Function> = []) {
    middleware.forEach(mw => {
      if (Array.isArray(mw)) {
        this.app.use(...mw);
      } else {
        this.app.use(mw)
      }
    })
    return this;
  }

  set(props: Array<any> = []) {
    props.forEach(prop => {
      if (Array.isArray(prop)) {
        this.app.set(...prop);
      }
    })
    return this;
  }

  finalize(cb: any) {
    cb();
    return this;
  }

  start() {
    const reqMap = SLU.getSpringLikeRequestMapping();

    this.providers.forEach(p => {
      SLU.InstanceFactory(p);
    })

    const entries = reqMap.entries();
    for (const item of entries) {
      const [path, callback] = item;
      const [type, handlerFunc] = callback;
      this.app[type](path, handlerFunc)
    }
    console.info('IoC Container started.')

    this.listen();
  }

  private listen() {
    const port = process.env.PORT || 3000;
    this.app.listen(port, () => {
      console.log(`Started at http://localhost:${port}`);
    });
  }
}