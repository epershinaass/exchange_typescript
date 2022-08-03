import { IAuthMessage, ICredentials, IMessage } from "../interface/account-grpc-interface";


export class AuthMessageDto implements IAuthMessage {
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
