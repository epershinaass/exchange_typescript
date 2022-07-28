import { status } from '@grpc/grpc-js';

export enum errCode {
  OK = status.OK,
  INVALID_ARGUMENTS = status.INVALID_ARGUMENT,
  NOT_FOUND = status.NOT_FOUND,
}

export function getGrpcError(errorCode: status) {
  if (errorCode === status.OK) {
    return {
      code: status.OK,
      message: 'Everething is OK',
    };
  }
  if (errorCode === status.NOT_FOUND) {
    return {
      code: status.NOT_FOUND,
      message: 'User not found',
    };
  }
  if (errorCode === status.INVALID_ARGUMENT) {
    return {
      code: status.INVALID_ARGUMENT,
      message: 'Invalid argument',
    };
  }
}