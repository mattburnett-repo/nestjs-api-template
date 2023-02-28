import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UseGuards
} from '@nestjs/common'
import { ExampleService } from './example.service'
import { CreateExampleDto } from './dto/create-example.dto'
import { UpdateExampleDto } from './dto/update-example.dto'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { AccessTokenGuard } from '../common/guards/accessToken.guard'

@ApiTags('example')
@Controller('example')
export class ExampleController {
  // eslint-disable-next-line prettier/prettier
  constructor(private readonly exampleService: ExampleService) { }

  @Post()
  // @ApiBadRequestResponse({ description: 'Error creating new example.' })
  create(@Body() createExampleDto: CreateExampleDto) {
    return this.exampleService.create(createExampleDto)
  }

  @UseGuards(AccessTokenGuard)
  @Get('protected')
  @ApiBearerAuth('bearerAuth')
  getProtected(): string {
    return this.exampleService.getProtected()
  }

  @Get()
  findAll() {
    return this.exampleService.findAll()
  }

  @Get('/id/:id')
  // @ApiBadRequestResponse()
  findOneById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.exampleService.findOneById(id)
  }

  @Patch('/id/:id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateTestDto: UpdateExampleDto
  ) {
    return this.exampleService.update(id, updateTestDto)
  }

  @Delete('/id/:id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.exampleService.remove(id)
  }
}
