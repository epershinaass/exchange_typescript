import { Catch, RpcExceptionFilter } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { Observable, throwError } from "rxjs";
import { Logger } from '@nestjs/common';
import { status } from '@grpc/grpc-js';


@Catch()
export class AllRpcExceptionFilter implements RpcExceptionFilter<RpcException> {
  catch(err): Observable<any> {
    const code = err.code ?? status.UNKNOWN;
    const rpcErr = new RpcException({ code });
    if (code === status.UNKNOWN) Logger.error(err);
    return throwError(() => rpcErr.getError());
  }
}