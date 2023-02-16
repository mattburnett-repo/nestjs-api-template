// https://www.elvisduru.com/blog/nestjs-jwt-authentication-refresh-token

import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { AccessTokenStrategy } from './strategies/accessToken.strategy'
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy'

import { UsersModule } from '../users/users.module'

// https://www.elvisduru.com/blog/nestjs-jwt-authentication-refresh-token

@Module({
  // TODO: JwtModule.register options?
  imports: [UsersModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy]
})
// eslint-disable-next-line prettier/prettier
export class AuthModule { }
