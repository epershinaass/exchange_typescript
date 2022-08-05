import { status } from '@grpc/grpc-js';

export enum errCode {
  OK = status.OK,
  // UNKNOWN = status.UNKNOWN,
  INVALID_ARGUMENTS = status.INVALID_ARGUMENT,
  NOT_FOUND = status.NOT_FOUND,
  // ALREADY_EXISTS = status.ALREADY_EXISTS,
  INTERNAL = status.INTERNAL,
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
      message: 'Balance not found',
    };
  }
  if (errorCode === status.INVALID_ARGUMENT) {
    return {
      code: status.INVALID_ARGUMENT,
      message: 'Invalid argument',
    };
  }
  if (errorCode === status.INTERNAL) {
    return {
      code: status.INTERNAL,
      message: 'Internal error',
    };
  }
}
