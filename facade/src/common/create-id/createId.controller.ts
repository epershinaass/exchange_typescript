import { Controller } from '@nestjs/common';
import { ClientOptions, GrpcMethod, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { createId } from './create-id';
import { CreateIdDto } from './dto/create-id.dto';

export const microserviceOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    // url: 'localhost:5004',
    package: 'createId',
    protoPath: join(__dirname, './proto/facade.proto'),
  },
};

@Controller()
export class CreateIdController {
  // @Client(microserviceOptions)
  // private client: ClientGrpc;

  @GrpcMethod('CreateIdController', 'CreateId')
  createId(): CreateIdDto {
    // @Body() CreateIdDto: CreateIdDto
    const newId: string = createId();
    return { new_id: newId };
  }
}
