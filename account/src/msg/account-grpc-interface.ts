import { Observable } from "rxjs";

export interface IAccountGrpcService {
  signIn(credentials: ICredentials): Observable<IAuthMessage>;
  signUp(credentials: ICredentials): Observable<IMessage>;
  isAuth(authMessage: IAuthMessage): Observable<IMessage>;
}

export interface ICredentials {
  login: string;
  password: string;
}

export interface IAuthMessage {
  token: string;
}

export interface IMessage {
  message: string;
}
