import { Observable } from 'rxjs';

export interface IGrpcService {
  accumulate(Object: IObject): Observable<any>;
}

interface IObject {
  id: string;
  name: string;
  count: number;
}
