import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import { getRepositoryToken } from '@nestjs/typeorm'

import * as request from 'supertest'

import { AuthModule } from '../src/auth/auth.module'
import { AuthDto } from '../src/auth/dto/auth.dto'
import { AuthService } from '../src/auth/auth.service'

import { User } from '../src/users/entities/user.entity'

import { AccessTokenGuard } from '../src/common/guards/accessToken.guard'
import { AccessTokenStrategy } from '../src/auth/strategies/accessToken.strategy'
import { RefreshTokenStrategy } from '../src/auth/strategies/refreshToken.strategy'
import { RefreshTokenGuard } from '../src/common/guards/refreshToken.guard'

// NestJS unit / integration testing basics
//    https://www.youtube.com/watch?v=dXOfOgFFKuY&t=776s

describe('Auth controller (e2e)', () => {
  let app: INestApplication

  const mockAuthUser: AuthDto = {
    username: 'test',
    password: 'test'
  }

  const mockToken = {
    user: {
      sub: 'test',
      refreshToken:
        'kkVMx5bUz7c4xcQe4yUid+nzcJmuhQYJcAuZrsjG1uvr+aN0Y1kL5nSs+jiYtQXIEpJs5WAlMUZW+xxj8QMVwQ=='
    }
  }

  const mockAuthService = {
    signUp: jest.fn().mockResolvedValue(mockAuthUser),
    login: jest.fn().mockResolvedValue(mockAuthUser)
  }

  const mockAccessTokenStrategy = {}
  const mockRefreshTokenStrategy = {}
  const mockUserRepository = {}

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AuthModule]
    })
      .overrideProvider(AuthService)
      .useValue(mockAuthService)
      .overrideProvider(AccessTokenStrategy)
      .useValue(mockAccessTokenStrategy)
      .overrideProvider(RefreshTokenStrategy)
      .useValue(mockRefreshTokenStrategy)
      .overrideProvider(getRepositoryToken(User))
      .useValue(mockUserRepository)
      .overrideGuard(AccessTokenGuard)
      .useValue(mockToken)
      .overrideGuard(RefreshTokenGuard)
      .useValue(mockToken)
      .compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  afterEach(async () => {
    await app.close()
  })

  it('/auth/signup (POST)', () => {
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send(mockAuthUser)
      .expect('Content-Type', /json/)
      .expect(201)
      .then((res) => {
        expect(res.body).toEqual({
          ...mockAuthUser
        })
      })
  })

  it('/auth/login (POST)', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ mockAuthUser })
      .expect('Content-Type', /json/)
      .expect(201)
      .then((res) => {
        expect(res.body).toEqual({
          ...mockAuthUser
        })
      })
  })

  //  FIXME: @Req and how to pass to the route in the controller
  it.skip('/auth/refresh (GET)', () => {
    return (
      request(app.getHttpServer())
        .get('/auth/refresh')
        // .send(mockRequest) // attach req.user somehow...
        .expect('Content-Type', /json/)
        .expect(200)
        .then((res) => {
          expect(res.body).toEqual({ mockToken })
        })
    )
  })

  //  FIXME: @Req and how to pass to the route in the controller
  it.skip('/auth/logout (GET)', () => {
    return (
      request(app.getHttpServer())
        .get('/auth/logout')
        // .send({ mockRequest }) // attach req.user somehow...
        .expect('Content-Type', /json/)
        .expect(200)
        .then((res) => {
          expect(res.body).toEqual({ ...mockAuthUser })
        })
    )
  })
})
