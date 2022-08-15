import { Body, Controller } from '@nestjs/common';
import { ClientOptions, GrpcMethod, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { createId } from './create-id';
import { CreateIdDto } from './dto/create-id.dto';

export const microserviceOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'createId',
    protoPath: join(__dirname, './proto/create-id.proto'),
  },
};

@Controller()
export class CreateIdController {
  @GrpcMethod('CreateIdController', 'CreateId')
  createId(): CreateIdDto {
    const newId: string = createId();
    return { newId: newId };
  }
}
