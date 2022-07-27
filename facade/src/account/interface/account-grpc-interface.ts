
export interface IGrpcService {
  signIn(credentials: ICredentialsRequest): Promise<IAuthMessage>;
  signUp(credentials: ICredentialsRequest): Promise<IResponse>;
  isAuth(authMessage: IAuthMessage): Promise<IResponse>;
}

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
