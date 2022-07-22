import { Observable } from 'rxjs';

export interface IGrpcService {
  signIn(credentials: Credentials): Observable<string>;
}

export interface Credentials {
  login: string;
  password: string;
}

export interface AuthToken {
  token: string;
}
