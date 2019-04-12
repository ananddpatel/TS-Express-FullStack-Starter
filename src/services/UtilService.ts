import { Service } from '../spring-like/decorators/Sterotype';
import { IUser } from '../models/User';
import { sign } from 'jsonwebtoken';

@Service('utilService')
export class UtilService {
  public createSignedToken(cleanedUser: {email: string}): string {
    return sign(cleanedUser, process.env.SECRET_KEY, {
      expiresIn: 86400
    });
  }
}
