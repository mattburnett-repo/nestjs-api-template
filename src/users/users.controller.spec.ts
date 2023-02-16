import { Test, TestingModule } from '@nestjs/testing'
import { CreateUserDto } from './dto/create-user.dto'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'

describe('UsersController', () => {
  let controller: UsersController

  const mockUser: CreateUserDto = {
    id: '1',
    name: 'test',
    username: 'test',
    password: 'test',
    email: 'test@test.com',
    refreshToken: 'test'
  }
  const mockUsers: CreateUserDto[] = [
    {
      id: '1',
      name: 'test',
      username: 'test',
      password: 'test',
      email: 'test@test.com',
      refreshToken: 'test'
    },
    {
      id: '2',
      name: 'test',
      username: 'test',
      password: 'test',
      email: 'test@test.com',
      refreshToken: 'test'
    }
  ]
  const mockUsersService = {
    create: jest.fn().mockResolvedValue(mockUser),
    findAll: jest.fn().mockResolvedValue(mockUsers),
    findById: jest.fn().mockResolvedValue(mockUser),
    findByUsername: jest.fn().mockResolvedValue(mockUser),
    update: jest.fn((id, mockUser) => ({
      id,
      ...mockUser
    })),
    delete: jest.fn().mockResolvedValue(mockUser)
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService]
    })
      .overrideProvider(UsersService)
      .useValue(mockUsersService)
      .compile()

    controller = module.get<UsersController>(UsersController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('should create a user', () => {
    expect(controller.create(mockUser)).resolves.toEqual({
      ...mockUser
    })
  })

  it('should find all users', () => {
    expect(controller.findAll()).resolves.toEqual(mockUsers)
  })

  it('should find a user by id', () => {
    expect(controller.findById('1')).resolves.toEqual(mockUser)
  })

  it('should find a user by username', () => {
    expect(controller.findByUsername('test')).resolves.toEqual({ ...mockUser })
  })

  it('should update a user', () => {
    expect(controller.update('1', mockUser)).toEqual({
      ...mockUser
    })
  })

  it('should delete a user', () => {
    expect(controller.update('1', mockUser)).toEqual({
      ...mockUser
    })
  })
})
