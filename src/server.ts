import express, { Application, json, urlencoded } from 'express';
import { MongoDb } from './database/config';
import { Router } from './routes';
import cors, { CorsOptions } from 'cors';
import cookieparser from 'cookie-parser';
export default class Server {
  constructor(app:Application) {
    this.config(app);
    MongoDb.connectDb();
  }

  public config(app:Application):void {
    app.use(urlencoded({ extended:true }));
    app.use(json({ limit:'4mb' }));
    const corsOption :CorsOptions = {
      origin:['http://localhost:3000'],
      credentials:true,
    };
    app.use(cors(corsOption));
    app.use(cookieparser());
    app.use('/storage/', express.static('storage'));
    Router.routesMount(app);
    
  }
}