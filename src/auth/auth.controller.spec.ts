import { Test, TestingModule } from '@nestjs/testing'
import { getMockReq } from '@jest-mock/express'

import { CreateUserDto } from '../users/dto/create-user.dto'

import { AuthDto } from './dto/auth.dto'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { RefreshTokenGuard } from '../common/guards/refreshToken.guard'
import { AccessTokenGuard } from '../common/guards/accessToken.guard'

describe('AuthController', () => {
  let controller: AuthController

  const mockUser: CreateUserDto = {
    id: '1',
    username: 'test',
    password: 'test',
    name: 'test',
    email: 'kenaa@example.com',
    refreshToken: 'test'
  }

  const mockLogin: AuthDto = {
    username: 'test',
    password: 'password'
  }

  // https://www.npmjs.com/package/@jest-mock/express/v/1.4.4
  const mockRequest = getMockReq({ user: { sub: '123', refreshToken: 'asdf' } })

  const mockTokens = {
    accessToken: 'access',
    refreshToken: 'refresh'
  }

  const mockAuthService = {
    signUp: jest.fn().mockResolvedValue(mockUser),
    login: jest.fn().mockResolvedValue(mockLogin),
    refreshTokens: jest.fn().mockResolvedValue({ mockTokens }),
    logout: jest.fn().mockImplementation(),
    hashData: jest.fn(),
    updateRefreshToken: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService]
    })
      .overrideProvider(AuthService)
      .useValue(mockAuthService)
      .overrideGuard(RefreshTokenGuard)
      .useValue(mockTokens)
      .overrideGuard(AccessTokenGuard)
      .useValue(mockTokens)
      .compile()

    controller = module.get<AuthController>(AuthController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('should sign up a user', async () => {
    expect(controller.signup(mockUser)).resolves.toEqual({
      ...mockUser
    })
  })

  it('should sign in a user', async () => {
    expect(controller.login(mockLogin)).resolves.toEqual({
      ...mockLogin
    })
  })

  it('should refresh tokens', async () => {
    expect(controller.refreshTokens(mockRequest)).resolves.toEqual({
      mockTokens
    })
  })

  it('should logout a user', async () => {
    expect(controller.refreshTokens(mockRequest)).resolves.toEqual({
      mockTokens
    })
  })
})
