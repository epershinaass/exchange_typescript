import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: '127.0.0.1:4002',
    package: 'hello',
    protoPath: join(__dirname, './hello/hello.proto'),
  },
};
