import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

import { AppModule } from './app.module'

import * as cookieParser from 'cookie-parser'
import helmet from 'helmet'
// NOTE: no csrf because it is advised to use JWT instead of cookie + csrf + session + ...
import { ValidationPipe } from '@nestjs/common'
// basicAuth to restrict access to swagger ui
import * as basicAuth from 'express-basic-auth'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService)
  const port = process.env.API_PORT || configService.get<number>('API_PORT')
  const nodeEnv = configService.get<string>('NODE_ENV')

  app.use(cookieParser())
  app.use(helmet())
  app.enableCors()

  // logger goes here
  //    or just instantiate a logger in the class/es you want logging for
  //    https://javascript.plainenglish.io/how-to-use-nestjs-logger-2a9cb107bce9

  app.useGlobalPipes(new ValidationPipe())

  app.use(
    ['/api', '/api-json', 'api-yaml'],
    basicAuth({
      challenge: true,
      users: {
        [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD
      }
    })
  )

  const swaggerConfig = new DocumentBuilder()
    .setTitle('NestJS API Template')
    .setDescription('NestJS API template documentation')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description:
          'Enter JWT token. Get a token from the auth/login endpoint.',
        in: 'header'
      },
      'bearerAuth' // This name here is important for matching up with @ApiBearerAuth() in your controller!
    )
    .build()
  // get api.json / api.yaml in the browser by theURL/api-json / theURL/api-yaml
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('api', app, swaggerDocument)

  // Start the server
  await app.listen(port, () => {
    console.log(
      'api started as NODE_ENV:',
      nodeEnv,
      'and listening on port:',
      port
    )
  })
}
bootstrap()
