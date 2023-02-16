import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
  logger: Logger

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) {
    this.logger = new Logger()
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(createUserDto)

    this.logger.log(`UserService created new user: ${newUser.id}`)
    return this.userRepository.save(newUser)
  }

  async findAll(): Promise<User[]> {
    this.logger.log(`UserService findAll`)
    return this.userRepository.find()
  }

  async findById(id: string): Promise<User> {
    this.logger.log(`UserService findById: ${id}`)
    return this.userRepository.findOne({ where: { id } })
  }

  async findByUsername(username: string): Promise<User> {
    this.logger.log(`UserService findByUsername: ${username}`)
    return this.userRepository.findOne({ where: { username } })
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const theUser = await this.findById(id)

    this.logger.log(`UserService updates User: ${id}`)

    // https://stackoverflow.com/questions/47792808/typeorm-update-item-and-return-it
    return this.userRepository.save({
      ...theUser, // existing fields
      ...updateUserDto // updated fields
    })
  }

  async remove(id: string) {
    const toDelete = await this.findById(id)

    this.logger.log(`ExampleService deletes a User: ${id}`)

    return this.userRepository.remove(toDelete)
  }
}
