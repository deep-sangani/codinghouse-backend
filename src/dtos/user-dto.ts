

export class UserDto {
  _id;

  phoneno;

  activated;

  createdAt;

  avatarUrl:any;

  constructor(user:any){
    this._id = user._id;
    this.phoneno = user.phone;
    this.activated = user.activated;
    this.avatarUrl = user.avatarPath ? `${process.env.BASE_SERVER_URL}/storage/${user.avatarPath}` : null;
    this.createdAt = user.createdAt;
  }
    
}