import { Application } from 'express';
import userRouter from './userRoutes';

export class Router{
  static routesMount(_app:Application):Application{
    return	_app.use('/user', userRouter);
  }
}

