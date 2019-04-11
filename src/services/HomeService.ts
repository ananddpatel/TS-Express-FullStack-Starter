import { Service } from '../spring-like/decorators/Service';
import { AutoWire } from '../spring-like/decorators/AutoWire';
import { HomeRepository } from "../repositories/HomeRepository";

@Service('homeService')
export class HomeService {
  @AutoWire
  public homeRepository: HomeRepository;
  public doThing(): Object {
    return this.homeRepository.getHelloWorld();
  }
}
