import { status } from '@grpc/grpc-js';
//import { IGrpcErr } from './account-grpc-interface';
import { RpcException } from '@nestjs/microservices';


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
  USER_MD = 'user created',
}

export function getGrpcErr(code: codes): RpcException {

  switch (code.valueOf()) {
    case status.UNKNOWN: return describe('something goes wrong');
    case status.INVALID_ARGUMENT: return describe('invalid request parameters');
    case status.NOT_FOUND: return describe('user with that login not found');
    case status.ALREADY_EXISTS: return describe('user already exists');
    case status.PERMISSION_DENIED: return describe('you don\'t have permission');
    case status.ABORTED: return describe('request aborted');
    case status.UNIMPLEMENTED: return describe('feature is not implemented');
    case status.UNAUTHENTICATED: return describe('you are not authenticated');
  }

  function describe(message: string): RpcException {
    return new RpcException({code, message});
  }
}
