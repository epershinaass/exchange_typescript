import { status } from '@grpc/grpc-js';

export enum statusGrpc {
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
}
