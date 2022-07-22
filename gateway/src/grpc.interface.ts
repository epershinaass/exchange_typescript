import { Observable } from 'rxjs';

export interface IGrpcService {
  signIn(Credentials): Observable<string>;
}

interface Credentials {
  login: string;
  password: string;
}
