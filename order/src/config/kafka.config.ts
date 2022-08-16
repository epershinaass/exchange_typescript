import { KafkaOptions, Transport } from '@nestjs/microservices';

export const KAFKA_CONFIG: KafkaOptions = {
  transport: Transport.KAFKA,
  options: {
    client: {
      // clientId: 'order',
      brokers: ['kafka1:9092'],
    },
    consumer: {
      groupId: 'balance-consumer',
    },
  },
};
