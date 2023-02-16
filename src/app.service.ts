import { Injectable, Inject, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AppService {
  @Inject(ConfigService)
  public config: ConfigService

  logger: Logger

  constructor() {
    this.logger = new Logger()
  }

  getHello(): string {
    this.logger.log('getHello is triggered!')
    return 'Hello World!'
  }
}
