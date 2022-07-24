import { Observable } from 'rxjs';

export interface IGrpcService {
  signIn(credentials: Credentials): Observable<any>;
}

export interface Credentials {
  login: string;
  password: string;
}

export interface AuthToken {
  token: string;
}
