import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // put other middlewares here as app.use(x)
  // cors, csurf, helmet, etc.
  const config = new DocumentBuilder()
    .setTitle('test example')
    .setDescription('The test API description')
    .setVersion('1.0')
    .addTag('test')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000, () => {
    console.log('localhost (with swagger and typeOrm) listening on port 3000');
  });
}
bootstrap();
