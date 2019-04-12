import { Request, Response } from 'express';
import { GetMapping } from '../spring-like/decorators/RequestMapping';
import { AutoWired } from '../spring-like/decorators/AutoWired';
import { HomeService } from "../services/HomeService";
import { Controller } from '../spring-like/decorators/Sterotype';

@Controller('homeController')
export class HomeController {
  @AutoWired
  private homeService: HomeService;

  @GetMapping('/')
  public index(req: Request, res: Response) {
    res.render('pages/index');
  }

  @GetMapping('/hello')
  public getHelloWorld(req: Request, res: Response) {
    const myRes = this.homeService.doThing();
    res.send(myRes);
  }
}
