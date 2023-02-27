import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

import { AppModule } from './app.module'

// routine, utility middlewares
import * as cookieParser from 'cookie-parser'
import helmet from 'helmet'
import { ValidationPipe } from '@nestjs/common'
// no csrf because it is advised to use JWT instead of cookie + csrf + session + ...

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.use(cookieParser())
  // helmet config options here: https://www.npmjs.com/package/helmet
  app.use(helmet())
  app.enableCors()

  // logger goes here somewhere
  //    or just instantiate a logger in the class/es you want logging for
  //    https://javascript.plainenglish.io/how-to-use-nestjs-logger-2a9cb107bce9

  app.useGlobalPipes(new ValidationPipe())

  // swagger / OpenAPI
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Example')
    .setDescription('NestJS API template documentation')
    .setVersion('1.0')
    .build()
  // get api.json / api.yaml in the browser by theURL/api-json / theURL/api-yaml
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('api', app, swaggerDocument)

  // Start the server
  await app.listen(4000, () => {
    console.log('api started and listening.')
  })
}
bootstrap()
