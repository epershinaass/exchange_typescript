import { Observable } from 'rxjs';

export interface IAccountGrpcService {
  signIn(credentials: ICredentials): Observable<IAuthToken>;
  signUp(credentials: ICredentials): Observable<IMessage>;
  verify(authToken: IAuthToken): Observable<IMessage>;
}

export interface ICredentials {
  login: string;
  password: string;
}

export interface IAuthToken {
  token: string;
}

export interface IMessage {
  message: string;
}
