

export class UserDto {
  _id;

  phoneno;

  activated;

  createdAt;

  avatsrUrl:any;

  constructor(user:any){
    this._id = user._id;
    this.phoneno = user.phone;
    this.activated = user.activated;
    this.avatsrUrl = user.avatarPath ? `${process.env.BASE_SERVER_URL}/storage/${user.avatarPath}` : null;
    this.createdAt = user.createdAt;
  }
    
}