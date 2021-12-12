import { NestFactory } from '@nestjs/core';
//import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
//const cookieSession = require('cookie-session');
import * as session from 'express-session';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(
  //   cookieSession({
  //     keys: ['asdfasfd'],
  //   }),
  // );

  // app.use(
  //   session({
  //     secret: 'keyboard cat',
  //     resave: false,
  //     saveUninitialized: true,
  //     cookie: { maxAge: 60000 }
  //   }),
  // );
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true,
  //   }),
  // );
  (app as any).set('etag', false);
  app.use((req, res, next) => {
    res.removeHeader('x-powered-by');
    res.removeHeader('date');
    next();
  });
  await app.listen(3000);
}
bootstrap();
