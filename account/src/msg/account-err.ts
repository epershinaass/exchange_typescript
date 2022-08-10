import { status } from '@grpc/grpc-js';
import { RpcException } from '@nestjs/microservices';
import { Catch, RpcExceptionFilter } from "@nestjs/common";
import { Observable, of, throwError } from 'rxjs';


export enum codes {
  UNKNOWN = status.UNKNOWN,
  INVALID_ARGS = status.INVALID_ARGUMENT,
  NOT_FOUND = status.NOT_FOUND,
  ALREADY_EXISTS = status.ALREADY_EXISTS,
  PERMISSION_DENIED = status.PERMISSION_DENIED,
  ABORTED = status.ABORTED,
  UNIMPLEMENTED = status.UNIMPLEMENTED,
  UNAUTHENTICATED = status.UNAUTHENTICATED,
}

export enum messages {
  USER_CREATED = 'user created',
}


export class ServiceError extends Error {
  constructor(code: codes) {
    super()
    this.code = code;
  }
  code: codes;
}

@Catch(ServiceError)
export class ServiceExceptionFilter implements RpcExceptionFilter {
  catch(err: ServiceError): Observable<any> {
    const rpcErr = new RpcException({ code: err.code });
    return throwError(() => rpcErr.getError());
  }
}
