import * as dotenv from 'dotenv';
dotenv.config();
import * as path from 'path';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';
import * as express from 'express';

const app = express();

import { index, HomeController } from './controllers/hello-world.controller';
import * as passport from 'passport';
import { passportStrategy } from './passport-strat';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev')); // logger

app.use('/public', express.static(path.join(__dirname, 'public/')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(passport.initialize());
passportStrategy(passport);

// mongoose.connect(
//     process.env.MONGO_URL as string,
//     { useNewUrlParser: true }
//   );

// app.get('/', helloWorldController.index);
// app.get('/', new HomeController().getHelloWorld);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  // const x = (<any>global).__SPRING_LIKE_CONTAINER__.get('homeController');
  app.get('/', new HomeController().getHelloWorld);

  const x = (global as any).__SPRING_LIKE_CONTAINER__;
  console.log(x);

  console.log(`Started at http://localhost:${port}`);
});
