import { IAuthMessage, ICredentials, IGrpcErr, IMessage } from "./account-grpc-interface";


export class AuthMessage implements IAuthMessage {
  constructor(login1: string, token: string) {
    this.login = login1;
    this.token = token;
    console.log(this.login)
    console.log(this.token)
  }
  login: string;
  token: string;
}

export class Credentials implements ICredentials {
  constructor(login1: string, password: string) {
    this.login = login1;
    this.password = password;
  }
  login: string;
  password: string;
}

export class Message implements IMessage {
  constructor(message: string) {
    this.message = message;
  }
  message: string;
}

export class GrpcErr implements IGrpcErr {
  constructor(code: number, message: string) {
    this.error = {
      code: code,
      message: message,
    }
  }
  error: { code: number; message: string; };
}
