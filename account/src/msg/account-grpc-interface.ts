
export interface IAccountService {
  signIn(ICredentials): Promise<IAuthMessageOrErr>;
  signUp(ICredentials): Promise<IMessageOrErr>;
  isAuth(IAuthMessage): Promise<IMessageOrErr>;
}

export interface ICredentials {
  login: string;
  password: string;
}

export interface IAuthMessage {
  login: string;
  token: string;
}

export interface IMessage {
  message: string;
}

export interface IGrpcErr {
  error: {
  code: number;
  message: string;
  };
}

export type IAuthMessageOrErr = IAuthMessage | IGrpcErr;
export type IMessageOrErr = IMessage | IGrpcErr;