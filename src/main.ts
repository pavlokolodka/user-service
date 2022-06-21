import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from './pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
        .setTitle('User service')
        .setDescription('Endpoint documentation')
        .setVersion('1.0.0')
        .addTag('API')
        .build()
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/docs', app, document)
    
  await app.listen(3000);
}
bootstrap();

