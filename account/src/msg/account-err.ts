import { status } from '@grpc/grpc-js';
//import { IGrpcErr } from './account-grpc-interface';
import { RpcException } from '@nestjs/microservices';
import { ArgumentsHost, Catch, ExceptionFilter, RpcExceptionFilter } from "@nestjs/common";
import { BaseExceptionFilter } from '@nestjs/core';
import { Request, Response } from 'express';
import { callbackify } from 'util';
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
  USER_MADE = 'user created',
}

@Catch()
export class AnyExceptionFilter implements RpcExceptionFilter {
  catch(code: codes): Observable<any> {
    const error = getGrpcErr(code);
    return throwError(() => error.getError());
  }
}

export function getGrpcErr(code: codes): RpcException {

  switch (code) {
    case codes.INVALID_ARGS: return describe('invalid request parameters');
    case codes.NOT_FOUND: return describe('user with that login not found');
    case codes.ALREADY_EXISTS: return describe('user already exists');
    case codes.PERMISSION_DENIED: return describe('you don\'t have permission');
    case codes.ABORTED: return describe('request aborted');
    case codes.UNIMPLEMENTED: return describe('feature is not implemented');
    case codes.UNAUTHENTICATED: return describe('you are not authenticated');
    case codes.UNKNOWN: return describe('something goes wrong'); //default case?
  }

  function describe(message: string): RpcException {
    return new RpcException({ code, message });
  }
}
