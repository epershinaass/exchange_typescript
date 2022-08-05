import { Catch, RpcExceptionFilter } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { Observable, throwError } from "rxjs";


@Catch()
export class AnyExceptionFilter implements RpcExceptionFilter {
  catch(error: RpcException): Observable<any> {
    return throwError(() => error);
  }
}