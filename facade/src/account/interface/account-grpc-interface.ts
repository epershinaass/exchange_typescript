import { Observable } from "rxjs";

export interface IAccountGrpcService {
  signIn(credentials: ICredentialsRequest): Observable<IAuthMessage>;
  signUp(credentials: ICredentialsRequest): Observable<IResponse>;
  isAuth(authMessage: IAuthMessage): Observable<IResponse>;
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
