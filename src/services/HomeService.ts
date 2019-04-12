import { AutoWired } from '../spring-like/decorators/AutoWired';
import { HomeRepository } from "../repositories/HomeRepository";
import { Service } from '../spring-like/decorators/Sterotype';

@Service('homeService')
export class HomeService {
  @AutoWired
  private homeRepository: HomeRepository;

  public doThing(): Object {
    return this.homeRepository.getHelloWorld();
  }
  
}