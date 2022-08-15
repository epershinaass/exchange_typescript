import { KafkaOptions, Transport } from '@nestjs/microservices';

export const KAFKA_CONFIG: KafkaOptions = {
  transport: Transport.KAFKA,
  options: {
    client: {
      clientId: 'order', // order
      brokers: ['kafka1:9092'], // localhost:29092
    },
    consumer: {
      groupId: 'order-balance', // order-balance-consumer
      // allowAutoTopicCreation: true,
    },
    // subscribe: {
    //   fromBeginning: true,
    // },
  },
};
