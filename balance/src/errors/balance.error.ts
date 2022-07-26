import { status } from '@grpc/grpc-js';

export enum statusGrpc {
  INVALID_ARGUMENT = 3,
  NOT_FOUND = 5,
}

export function getStatusGrpcError(errorCode: statusGrpc): IError {
  if (errorCode === statusGrpc.NOT_FOUND) {
    return {
      error: {
        code: status.NOT_FOUND,
        message: 'Balance not found',
      },
    };
  }
  if (errorCode === statusGrpc.INVALID_ARGUMENT) {
    return {
      error: {
        code: status.INVALID_ARGUMENT,
        message: 'Invalid argument',
      },
    };
  }
}
