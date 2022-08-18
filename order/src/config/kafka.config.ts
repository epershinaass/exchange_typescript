import { KafkaOptions, Transport } from '@nestjs/microservices';

export const KAFKA_CONFIG_BALANCE: KafkaOptions = {
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

export const KAFKA_CONFIG_PRODUCTS: KafkaOptions = {
  transport: Transport.KAFKA,
  options: {
    client: {
      // clientId: 'order',
      brokers: ['kafka1:9092'],
    },
    consumer: {
      groupId: 'products-consumer',
    },
  },
};
