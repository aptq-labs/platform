import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for frontend connection (e.g., app running on port 3000/5173/etc)
  app.enableCors();

  await app.listen(process.env.PORT ?? 8000);
  console.log(`API Gateway is running on: http://localhost:8000`);
}
bootstrap().catch((err) => console.error(err));
