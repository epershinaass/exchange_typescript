import { Observable } from 'rxjs';

export interface IGrpcService {
  accumulate(Object: IObject): Observable<any>;
}

interface IObject {
  data: object;
}
