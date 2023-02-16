import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID
} from 'class-validator'

export class CreateExampleDto {
  @IsUUID()
  @IsNotEmpty()
  id: string

  @IsString()
  testString?: string

  @IsNumber()
  testNumber?: number

  @IsBoolean()
  testBoolean?: boolean

  @IsBoolean()
  isActive?: boolean

  @IsString()
  name?: string

  @IsString()
  description?: string
}
