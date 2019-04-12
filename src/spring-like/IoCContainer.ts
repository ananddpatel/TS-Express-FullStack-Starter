import { SpringLikeUtils as SLU } from "./SpringLikeUtils";
import * as express from 'express';
import { RequestHandlerParams } from "express-serve-static-core";

export class IoCContainer {
  app: any;
  providers: Function[] = [];

  constructor(app: any = express()) {
    this.app = app;
    return this;
  }

  provide(providers: Array<Function> = []) {
    this.providers = providers;
    return this;
  }

  use(middleware: Array<RequestHandlerParams> = []) {
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
      const [type, handlerFunc, middlewares] = callback;
      this.app[type](path, handlerFunc, ...middlewares)
    }
    this.listen();
  }

  private listen() {
    const port = process.env.PORT || 3000;
    this.app.listen(port, () => {
      console.log(`Started at http://localhost:${port}`);
    });
  }
}