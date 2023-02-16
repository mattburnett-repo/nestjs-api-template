import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'

import { CreateUserDto } from './dto/create-user.dto'
import { User } from './entities/user.entity'
import { UsersService } from './users.service'

describe('UsersService', () => {
  let service: UsersService

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

  const mockUsersRepository = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest
      .fn()
      .mockImplementation((mockUser) => Promise.resolve({ ...mockUser })),
    find: jest.fn().mockImplementation(() => Promise.resolve({ ...mockUsers })),
    findAll: jest.fn().mockResolvedValue(mockUsers),
    findOne: jest
      .fn()
      .mockImplementation(() => Promise.resolve({ ...mockUser })),
    findById: jest
      .fn()
      .mockImplementation(() => Promise.resolve({ ...mockUser })),
    findByUsername: jest.fn().mockResolvedValue(mockUser),
    update: jest.fn().mockImplementation(() => Promise.resolve({ ...mockUser }))
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUsersRepository
        }
      ]
    }).compile()

    service = module.get<UsersService>(UsersService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should create a user', async () => {
    expect(await service.create(mockUser)).toEqual({
      ...mockUser
    })
  })

  it('should find all users', async () => {
    expect(await service.findAll()).toEqual({ ...mockUsers })
  })

  it('should find a user by id', async () => {
    expect(await service.findById('1')).toEqual(mockUser)
  })
  it('should find a user by username', async () => {
    expect(await service.findByUsername('test')).toEqual({
      ...mockUser
    })
  })
  it('should update a user', async () => {
    expect(service.update('1', mockUser)).resolves.toEqual({
      id: '1',
      ...mockUser
    })
  })
})
