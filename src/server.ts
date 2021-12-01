import { Application, json, urlencoded } from 'express';
import { MongoDb } from './database/config';
import { Router } from './routes';


export default class Server {
  constructor(app:Application) {
    this.config(app);
    MongoDb.connectDb();
  }

  public config(app:Application):void {
    app.use(urlencoded({ extended:true }));
    app.use(json());

    Router.routesMount(app);
    
  }
}