import { Request, Response } from 'express';
import { Controller } from '../spring-like/decorators/Controller';
import { Repository } from '../spring-like/decorators/Repository';
import { Service } from '../spring-like/decorators/Service';
import { RequestMapping } from '../spring-like/decorators/RequestMapping';
// import { AutoWired } from '../spring-like/decorators/AutoWired';

export const index = (_req, res) => {
  res.render('pages/index');
};

@Controller('homeController')
export class HomeController {
  // @AutoWired()
  public homeService: HomeService;
  // constructor(homeService: HomeService) {
  constructor() {
    // this.homeService = homeService;
    this.homeService = new HomeService(new HomeRepository());
  }

  public index(req: Request, res: Response) {
    res.render('pages/index');
  }

  @RequestMapping('/', 'get')
  public getHelloWorld(req: Request, res: Response) {
    console.log((<any>global).__SPRING_LIKE_CONTAINER__);
    
    const myRes = this.homeService.homeRepository.getHelloWorld();
    res.send(myRes);
  }
}

// tslint:disable-next-line:max-classes-per-file
@Repository('homeRepository')
export class HomeRepository {
  public getHelloWorld() {
    return 'Hello World';
  }
}

// tslint:disable-next-line:max-classes-per-file
@Service('homeService')
export class HomeService {
  public homeRepository: HomeRepository;

  constructor(homeRepository: HomeRepository) {
    this.homeRepository = homeRepository;
  }

  public doThing(): string {
    return this.homeRepository.getHelloWorld();
  }
}
