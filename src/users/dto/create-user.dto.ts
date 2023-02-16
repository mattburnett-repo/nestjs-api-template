import { IsEmail, IsNotEmpty, IsString, IsUUID } from 'class-validator'

export class CreateUserDto {
  @IsUUID()
  @IsNotEmpty()
  id: string

  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  username: string

  @IsEmail()
  email: string

  @IsString()
  @IsNotEmpty()
  password: string

  @IsString()
  refreshToken: string
}
