import { status } from '@grpc/grpc-js';

export function getGrpcError(errorCode: status) {
  if (errorCode === status.OK) {
    return {
      status: status.OK,
    };
  }
  if (errorCode === status.NOT_FOUND) {
    return {
      error: {
        code: status.NOT_FOUND,
        message: 'Balance not found',
      },
    };
  }
  if (errorCode === status.INVALID_ARGUMENT) {
    return {
      error: {
        code: status.INVALID_ARGUMENT,
        message: 'Invalid argument',
      },
    };
  }
  if (errorCode === status.INTERNAL) {
    return {
      error: {
        code: status.INTERNAL,
        message: 'Internal error',
      },
    };
  }
}
