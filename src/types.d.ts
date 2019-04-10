declare module 'morgan';

type SpringLikeContainer = Map<string, Function>;

export interface Global {
  __SPRING_LIKE_CONTAINER__: SpringLikeContainer;
}
