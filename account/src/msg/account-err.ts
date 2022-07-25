//import { status as code } from '@grpc/grpc-js';
import { IGrpcErr } from './account-grpc-interface';

// Look more of these there: https://github.com/grpc/grpc/blob/master/doc/statuscodes.md
export enum codes {
  INVALID_ARGUMENT = 3,
  NOT_FOUND = 5,
  ALREADY_EXISTS = 6,
  PERMISSION_DENIED = 7,
  ABORTED = 10,
  UNIMPLEMENTED = 12,
  UNAUTHENTICATED = 16,
}

//export { status };

export function getGrpcError(codeErr: codes): IGrpcErr {

  switch (codeErr) {
    case codes.INVALID_ARGUMENT:  return describe('invalid request parameters');
    case codes.NOT_FOUND:         return describe('user with that login not found');
    case codes.ALREADY_EXISTS:    return describe('user already exists');
    case codes.PERMISSION_DENIED: return describe('you don\'t have permission');
    case codes.ABORTED:           return describe('request aborted');
    case codes.UNIMPLEMENTED:     return describe('feature is not implemented');
    case codes.UNAUTHENTICATED:   return describe('you are not authenticated');
  }

  function describe(message): IGrpcErr  {
    return {
      error: {
        code: codeErr,
        message,
      }
    };
  }
}
