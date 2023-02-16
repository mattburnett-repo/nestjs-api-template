import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseUUIDPipe
} from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { AccessTokenGuard } from '../common/guards/accessToken.guard'
import { ApiBadRequestResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('users')
@Controller('users')
export class UsersController {
  // eslint-disable-next-line prettier/prettier
  constructor(private readonly usersService: UsersService) { }

  @ApiBadRequestResponse()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @Get()
  findAll() {
    return this.usersService.findAll()
  }

  @Get('/id/:id')
  findById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.usersService.findById(id)
  }

  @Get('/username/:username')
  findByUsername(@Param('username') username: string) {
    return this.usersService.findByUsername(username)
  }

  @UseGuards(AccessTokenGuard)
  @Patch('/id/:id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.usersService.update(id, updateUserDto)
  }

  @UseGuards(AccessTokenGuard)
  @Delete('/id/:id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.usersService.remove(id)
  }
}
