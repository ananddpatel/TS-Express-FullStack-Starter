import { Request, Response } from 'express';
import { Controller } from '../spring-like/decorators/Controller';
import { Repository } from '../spring-like/decorators/Repository';
import { Service } from '../spring-like/decorators/Service';
import { AutoWired } from '../spring-like/decorators/AutoWired';

export const index = (_req, res) => {
  res.render('pages/index');
};

@Controller('homeController')
export class HomeController {
  // @AutoWired()
  homeService: HomeService;
  // constructor(homeService: HomeService) {
  constructor() {
    // this.homeService = homeService;
    this.homeService = new HomeService(new HomeRepository());
  }

  index(req: Request, res: Response) {
    res.render('pages/index');
  }

  getHelloWorld(req: Request, res: Response) {
    const myRes = this.homeService.homeRepository.getHelloWorld();
    res.send(myRes);
  }
}

@Repository('homeRepository')
export class HomeRepository {
  getHelloWorld() {
    return 'Hello World';
  }
}

@Service('homeService')
export class HomeService {
  homeRepository: HomeRepository;

  constructor(homeRepository: HomeRepository) {
    this.homeRepository = homeRepository;
  }

  doThing(): string {
    return this.homeRepository.getHelloWorld();
  }
}
