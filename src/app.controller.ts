// import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common'
import { Controller, Get } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { AppService } from './app.service'
// import { AuthService } from './auth_prev/auth.service'
// import { JwtAuthGuard } from './auth_prev/jwr-auth.guard'
@ApiTags('root')
@Controller()
export class AppController {
  // constructor(private readonly appService: AppService) { }
  // constructor(private readonly authService: AuthService, private readonly appService: AppService) { }
  // eslint-disable-next-line prettier/prettier
  constructor(private readonly appService: AppService) { }

  //  auth implementation https://www.youtube.com/watch?v=_L225zpUK0M&list=WL&index=17

  // @Post('login')
  // login(@Request() req): any {
  //   return this.authService.login(req.body)
  // }

  // @UseGuards(JwtAuthGuard)
  // @Get('protected')
  // showUser(): object {
  //   return { msg: 'protected' }
  // }

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }
}
