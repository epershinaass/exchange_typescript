
// export interface IAccountService {
//   signIn(ICredentials): Promise<string | number>;
//   signUp(ICredentials): Promise<string | number>;
//   isAuth(IAuthMessage): Promise<object | number>;
// }
// export interface IAccountController {
//   signIn(ICredentials): Promise<IAuthMessage>;
//   signUp(ICredentials): Promise<IMessage>;
//   isAuth(IAuthMessage): Promise<IMessage>;
// }

export interface ICredentialsRequest {
  login: string;
  password: string;
}

export interface IAuthMessage {
  token: string;
}

export interface IResponse {
  message: string;
}

// export interface IGrpcErr {
//   code: number;
//   message: string;
// }