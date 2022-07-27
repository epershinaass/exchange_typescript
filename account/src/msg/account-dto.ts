import { IAuthMessage, ICredentialsRequest, IResponse } from "./account-grpc-interface";


export class AuthMessage implements IAuthMessage {
  constructor(token: string) {
    this.token = token;
  }
  token: string;
}

export class Credentials implements ICredentialsRequest {
  constructor(login: string, password: string) {
    this.login = login;
    this.password = password;
  }
  login: string;
  password: string;
}

export class Message implements IResponse {
  constructor(message: string) {
    this.message = message;
  }
  message: string;
}

// export class GrpcErr implements IGrpcErr {
//   constructor(code: number, message: string) {
//       this.code = code;
//       this.message = message;
//   }
//   code: number;
//   message: string;
// }
