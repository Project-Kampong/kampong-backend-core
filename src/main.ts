import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

const GLOBAL_PREFIX = 'api';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  app.setGlobalPrefix(GLOBAL_PREFIX);
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  const NODE_ENV = configService.get('NODE_ENV');

  const options = new DocumentBuilder()
    .setTitle('Kampong Core Backend')
    .setDescription('API for Kampong Core Backend')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  app.listen(port, () => {
    Logger.log(
      `Server listening on http://localhost:${port}/${GLOBAL_PREFIX} in ${NODE_ENV} mode`,
    );
  });
}

bootstrap();
