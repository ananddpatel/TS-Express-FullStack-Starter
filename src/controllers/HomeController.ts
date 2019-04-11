import { Request, Response } from 'express';
import { RequestMapping } from '../spring-like/decorators/RequestMapping';
import { AutoWired } from '../spring-like/decorators/AutoWired';
import { HomeService } from "../services/HomeService";
import { Controller } from '../spring-like/decorators/Sterotype';

@Controller('homeController')
export class HomeController {
  @AutoWired
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
