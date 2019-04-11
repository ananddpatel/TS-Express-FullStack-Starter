import * as dotenv from 'dotenv';
dotenv.config();
import * as path from 'path';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';
import * as express from 'express';

// const app = express();

import { HomeController } from './controllers/HomeController';
import * as passport from 'passport';
import { passportStrategy } from './passport-strat';
import { IoCContainer } from './spring-like/IoCContainer';

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(morgan('dev')); // logger

// app.use('/public', express.static(path.join(__dirname, 'public/')));
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

// app.use(passport.initialize());
// passportStrategy(passport);

// mongoose.connect(
//     process.env.MONGO_URL as string,
//     { useNewUrlParser: true }
//   );
new IoCContainer(express())
  .use([
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true }),
    morgan('dev'),
    ['/public', express.static(path.join(__dirname, 'public/'))],
    passport.initialize()
  ])
  .set([
    ['views', path.join(__dirname, 'views')],
    ['view engine', 'ejs']
  ])
  .provide([HomeController])
  .finalize(() => {
    passportStrategy(passport);
  })
  .start();
