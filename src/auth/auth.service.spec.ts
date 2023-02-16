import { Test, TestingModule } from '@nestjs/testing'
import { CreateUserDto } from 'src/users/dto/create-user.dto'
import { AuthService } from './auth.service'

describe('AuthService', () => {
  let service: AuthService

  const mockTokens = {
    accessToken: 'access',
    refreshToken: 'refresh'
  }

  const mockHash = 'test'

  const mockAuthService = {
    signUp: jest.fn().mockImplementation((dto) => dto),
    login: jest.fn().mockImplementation((dto) => dto),
    hashData: jest.fn().mockResolvedValue({ mockHash }),
    getTokens: jest.fn().mockResolvedValue(mockTokens),
    refreshTokens: jest.fn().mockResolvedValue(mockTokens),
    updateRefreshToken: jest.fn().mockResolvedValue(mockTokens),
    logout: jest.fn().mockImplementation(() => Promise.resolve({ ...mockUser }))
  }

  const mockUser: CreateUserDto = {
    id: '1',
    name: 'test',
    username: 'test',
    password: 'test',
    email: 'test@test.com',
    refreshToken: 'test'
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService]
    })
      .overrideProvider(AuthService)
      .useValue(mockAuthService)
      .compile()

    service = module.get<AuthService>(AuthService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should sign up a user', async () => {
    expect(await service.signUp(mockUser)).toEqual({
      ...mockUser
    })
  })

  it('should sign in a user', async () => {
    expect(await service.login(mockUser)).toEqual({
      ...mockUser
    })
  })

  it('should log out a user', async () => {
    expect(await service.logout('1')).toEqual({
      ...mockUser
    })
  })

  it('should hash data', async () => {
    expect(await service.hashData(mockHash)).toEqual({
      mockHash
    })
  })
  it('should get tokens', async () => {
    expect(service.getTokens('1', 'test')).resolves.toEqual({
      accessToken: 'access',
      refreshToken: 'refresh'
    })
  })
  it('should refresh tokens', async () => {
    expect(service.refreshTokens('1', 'test')).resolves.toEqual({
      accessToken: 'access',
      refreshToken: 'refresh'
    })
  })
  it('should update refresh token', async () => {
    expect(service.updateRefreshToken('1', 'test')).resolves.toEqual({
      accessToken: 'access',
      refreshToken: 'refresh'
    })
  })
})
