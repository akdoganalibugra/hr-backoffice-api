import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.setGlobalPrefix(configService.get('app.apiPrefix'));

  const port = configService.get('app.port');
  await app.listen(port);

  console.log(
    `🚀 HR Backoffice API running on: http://localhost:${port}/${configService.get('app.apiPrefix')}`,
  );
  console.log(`📊 Environment: ${configService.get('app.nodeEnv')}`);
  console.log(`🔗 Database: Connected`);
}

bootstrap();
