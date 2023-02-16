import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Request } from 'express'
import { AccessTokenGuard } from '../common/guards/accessToken.guard'
import { RefreshTokenGuard } from '../common/guards/refreshToken.guard'
import { CreateUserDto } from '../users/dto/create-user.dto'
import { AuthService } from './auth.service'
import { AuthDto } from './dto/auth.dto'

// https://www.elvisduru.com/blog/nestjs-jwt-authentication-refresh-token
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  // eslint-disable-next-line prettier/prettier
  constructor(private authService: AuthService) { }

  @Post('signup')
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto)
  }

  @Post('login')
  login(@Body() data: AuthDto) {
    return this.authService.login(data)
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(@Req() req: Request) {
    // console.log('req.user: ', req.user)

    const userId = req.user['sub']
    const refreshToken = req.user['refreshToken']
    return this.authService.refreshTokens(userId, refreshToken)
  }

  @UseGuards(AccessTokenGuard)
  @Get('logout')
  logout(@Req() req: Request) {
    this.authService.logout(req.user['sub'])
  }
}
