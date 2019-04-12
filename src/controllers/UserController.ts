import { Request, Response } from 'express';
import { RequestMapping, PostMapping } from '../spring-like/decorators/RequestMapping';
import { AutoWired } from '../spring-like/decorators/AutoWired';
import { Controller } from '../spring-like/decorators/Sterotype';
import { UserRepository } from '../repositories/UserRepository';
import { SuccessMessage, ErrorMessage } from '../models/Message';

@Controller('userController')
export class UserController {
  @AutoWired
  private userRepository: UserRepository;

  @PostMapping('/user/register')
  public register(req: Request, res: Response) {
    if (!req.body.email || !req.body.password) {
      return res.send(new ErrorMessage('Email and Password required.'))
    }
    return this.userRepository.storeUser(req.body.email, req.body.password)
      .then((token: string) => {
        res.send(new SuccessMessage('User created', {token}))
      })
      .catch(error => {
        res.status(500).send(new ErrorMessage('Email already exists', {error}))
      })
  }

  @PostMapping('/user/login')
  public login(req: Request, res: Response) {
    if (!req.body.email || !req.body.password) {
      return res.send(new ErrorMessage('Email and Password required.'))
    }
    return this.userRepository.findUser(req.body.email, req.body.password)
    .then((token: string) => {
      res.send(new SuccessMessage('Success', {token}))
    })
    .catch((error: string) => {
      const message = typeof error === 'string';
      res.status(500).send(new ErrorMessage(message ? error : undefined, {error}))
    })
  }
}
