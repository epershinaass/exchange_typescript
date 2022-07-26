import { status } from '@grpc/grpc-js';
import { GrpcErr } from './account-dto';
import { IGrpcErr } from './account-grpc-interface';

// Look more of these there: https://github.com/grpc/grpc/blob/master/doc/statuscodes.md
export enum codes {
  UNKNOWN = 2,
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

  switch (codeErr.valueOf()) {
    case status.UNKNOWN: return describe('something goes wrong');
    case status.INVALID_ARGUMENT: return describe('invalid request parameters');
    case status.NOT_FOUND: return describe('user with that login not found');
    case status.ALREADY_EXISTS: return describe('user already exists');
    case status.PERMISSION_DENIED: return describe('you don\'t have permission');
    case status.ABORTED: return describe('request aborted');
    case status.UNIMPLEMENTED: return describe('feature is not implemented');
    case status.UNAUTHENTICATED: return describe('you are not authenticated');
  }

  function describe(message: string): IGrpcErr {
    return {
      error: {
        code: codeErr,
        message,
      }
    };
  }
}

    //    return new GrpcErr(codeErr, message);
