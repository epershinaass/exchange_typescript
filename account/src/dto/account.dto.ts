import { IAuthResponse, IAuthToken, ICredentials, IMessage } from "../interfaces/account.interface";


export class AuthTokenDto implements IAuthToken {
  constructor(token: string) {
    this.token = token;
  }
  token: string;
}

export class CredentialsDto implements ICredentials {
  constructor(login: string, password: string) {
    this.login = login;
    this.password = password;
  }
  login: string;
  password: string;
}

export class MessageDto implements IMessage {
  constructor(message: string) {
    this.message = message;
  }
  message: string;
}

export class AuthResponseDto implements IAuthResponse {
  constructor(sub: string, username: string) {
    this.sub = sub;
    this.username = username;
  }
  sub: string;
  username: string;
}
