import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

const PORT = process.env.PORT || 3000

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({allowedHeaders:'*'});
  app.setGlobalPrefix('api');
  await app.listen(PORT);
}
bootstrap();
