import { Repository } from "../spring-like/decorators/Sterotype";

@Repository('homeRepository')
export class HomeRepository {
  public getHelloWorld() {
    return {hello: 'world'};
  }
}
