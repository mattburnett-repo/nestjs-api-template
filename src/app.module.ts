import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AppController } from './app.controller'
import { AppService } from './app.service'

import { ExampleModule } from './example/example.module'

import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'

// https://stackoverflow.com/questions/59913475/configure-typeorm-with-one-configuration-for-cli-and-nestjs-application
import dbConfig from './config/dbConfig'

// https://www.elvisduru.com/blog/nestjs-jwt-authentication-refresh-token

@Module({
  imports: [
    ExampleModule,
    UsersModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        ...configService.get('database')
      })
    }),
    ConfigModule.forRoot({ isGlobal: true, load: [dbConfig] }),
    UsersModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
// eslint-disable-next-line prettier/prettier
export class AppModule { }
