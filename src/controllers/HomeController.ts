import { Request, Response } from 'express';
import { Controller } from '../spring-like/decorators/Controller';
import { RequestMapping } from '../spring-like/decorators/RequestMapping';
import { AutoWire } from '../spring-like/decorators/AutoWire';
import { HomeService } from "../services/HomeService";

@Controller('homeController')
export class HomeController {
  @AutoWire
  public homeService: HomeService;

  @RequestMapping('/', 'get')
  public index(req: Request, res: Response) {
    res.render('pages/index');
  }

  @RequestMapping('/hello', 'get')
  public getHelloWorld(req: Request, res: Response) {
    const myRes = this.homeService.doThing();
    res.send(myRes);
  }
}
