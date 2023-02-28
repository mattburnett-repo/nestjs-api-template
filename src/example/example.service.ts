import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { CreateExampleDto } from './dto/create-example.dto'
import { UpdateExampleDto } from './dto/update-example.dto'

import { Example } from './entities/example.entity'

@Injectable()
export class ExampleService {
  logger: Logger

  constructor(
    @InjectRepository(Example) private exampleRepository: Repository<Example>
  ) {
    this.logger = new Logger()
  }

  getProtected(): string {
    return 'This is a protected resource. If you see this, authentication was successful.'
  }

  create(createExampleDto: CreateExampleDto) {
    const newExample = this.exampleRepository.create(createExampleDto)

    this.logger.log(
      `ExampleService created a new Example: ${newExample.testString}`
    )
    return this.exampleRepository.save(newExample)
  }

  findAll() {
    return this.exampleRepository.find()
  }

  findOneById(id: string) {
    return this.exampleRepository.findOneById(id)
  }

  async update(id: string, updateExampleDto: UpdateExampleDto) {
    const example = await this.findOneById(id)

    example.testString = updateExampleDto.testString
    example.testNumber = updateExampleDto.testNumber
    example.isActive = updateExampleDto.isActive
    example.description = updateExampleDto.description

    this.logger.log(`ExampleService updates an Example: ${id}`)

    return this.exampleRepository.save(example)
  }

  async remove(id: string) {
    const toDelete = await this.findOneById(id)

    this.logger.log(`ExampleService deletes an Example: ${id}`)

    return this.exampleRepository.remove(toDelete)
  }
}
