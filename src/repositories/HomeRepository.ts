import { Repository } from '../spring-like/decorators/Repository';

@Repository('homeRepository')
export class HomeRepository {
  public getHelloWorld() {
    return {hello: 'world'};
  }
}
