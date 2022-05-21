import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: ['verbose'] });

  // Swagger config ----------------------------
  const config = new DocumentBuilder()
    .setTitle('Bot Switcher API')
    .setDescription('Bot Switcher API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
  console.log('Bot Switcher is running on Port: 3000');
}
bootstrap();
