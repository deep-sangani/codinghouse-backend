import mongoose from 'mongoose';

export class MongoDb{
  static async connectDb():Promise<void>{
    try {
      var dbUrl:string = process.env.DATABASE_URL! ;
      await mongoose.connect(dbUrl);
      console.log('database connected');
      
    } catch (error) {
      console.log(error);
      
       
    }
    

  }
}