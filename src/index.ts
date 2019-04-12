import * as dotenv from 'dotenv';
dotenv.config();
import * as path from 'path';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';
import * as express from 'express';
import * as passport from 'passport';

import { HomeController } from './controllers/HomeController';
import { passportStrategy } from './passport-strat';
import { IoCContainer } from './spring-like/IoCContainer';
import { UserController } from './controllers/UserController';


new IoCContainer()
  .use([
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true }),
    morgan('dev'),
    ['/public', express.static(path.join(__dirname, 'public/'))],
    passport.initialize()
  ])
  .set([['views', path.join(__dirname, 'views')], ['view engine', 'ejs']])
  .provide([HomeController, UserController])
  .finalize(() => {
    passportStrategy(passport);
    mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });
  })
  .start();
