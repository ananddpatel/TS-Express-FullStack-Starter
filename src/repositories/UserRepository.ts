import { Repository } from '../spring-like/decorators/Sterotype';
import User, { IUser } from '../models/User';
import { AutoWired } from '../spring-like/decorators/AutoWired';
import { UtilService } from '../services/UtilService';

@Repository('userRepository')
export class UserRepository {
  @AutoWired
  private utilService: UtilService;

  storeUser(email: string, password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const user = new User({ email, password });
      user
        .save()
        .then((u: any) => {
          const cleanedUser = {
            email: u.email
          };
          const token = this.utilService.createSignedToken(cleanedUser);
          resolve(token);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  findUser(email: string, password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      User.findOne({ email }, (err, user: any) => {
        if (err) {
          reject(err);
        }
        if (user) {
          user.comparePassword(password, (compareErr, matched) => {
            if (!compareErr && matched) {
              const cleanedUser = {
                email: user.email
              };
              const token = this.utilService.createSignedToken(cleanedUser);
              resolve(token);
            } else {
              reject('Password did not match')
            }
          });
        }
      });
    })

  }
}
