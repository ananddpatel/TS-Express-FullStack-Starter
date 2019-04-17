import { SpringLikeUtils as SLU } from './SpringLikeUtils';
import * as express from 'express';
import { RequestHandlerParams, Response } from 'express-serve-static-core';
import { Observable } from 'rxjs';

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
        this.app.use(mw);
      }
    });
    return this;
  }

  set(props: Array<any> = []) {
    props.forEach(prop => {
      if (Array.isArray(prop)) {
        this.app.set(...prop);
      }
    });
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
    });

    const entries = reqMap.entries();
    for (const item of entries) {
      const [path, requestHandler] = item;
      const [type, handlerFunc, middlewares] = requestHandler;

      const multiReturnTypeResponseHandler = (req: Request, res: Response) => {
        const controllerResult = handlerFunc(req, res);
        if (controllerResult) {
          const sendResponse = content => res.send(content);
          if (controllerResult instanceof Observable) {
            controllerResult.subscribe(sendResponse);
          } else if (controllerResult instanceof Promise) {
            controllerResult.then(sendResponse);
          } else {
            sendResponse(controllerResult);
          }
        }
      };

      this.app[type](path, multiReturnTypeResponseHandler, ...middlewares);
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
