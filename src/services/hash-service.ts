import crypto from 'crypto';
export class HashService{
  static genarateHash(inputdata:string):string{
    const hash = crypto.createHmac('sha256', process.env.HASH_SECRET!).update(inputdata).digest('hex');
    return hash;
  }

  static async validateHash(data:string, hash:string):Promise<boolean>{
    const genHash = await this.genarateHash(data);
    
    if (genHash === hash){
      console.log({ genHash:genHash === hash });
      
      return true;
    }
    console.log({ genHash :genHash === hash });
    
    return false;
  }
}