import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'user',
        protoPath: require.resolve('@aptq-platform/protos/user.proto'),
        url: 'localhost:6001',
      },
    },
  );

  await app.listen();
  console.log('User gRPC Service is running on: localhost:6001');
}
bootstrap().catch((err) => console.error(err));
