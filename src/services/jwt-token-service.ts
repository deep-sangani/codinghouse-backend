
interface Payload{
  phoneno:string,
  userid:string
}
export class Token{

  static getAccessToken(payload:Payload):string{
    console.log(payload);
    return 'hello';
  }
}