import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '../src/app.module'

describe('AppController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  afterEach(async () => {
    await app.close()
  })

  it('should be defined', () => {
    expect(app).toBeDefined()
  })
  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!')
  })

  it('rejects a GET to a protected endpoint when there is no authorization', async () => {
    return request(app.getHttpServer())
      .get('/example/protected')
      .expect('Content-Type', /json/)
      .expect(401)
  })

  it('GETs a protected endpoint when auth is provided.', async () => {
    // https://stackoverflow.com/questions/58359414/how-e2e-with-guard-nestjs

    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'testOne', password: 'testOne' })
      .expect(201)

    // store the jwt token for the next request
    const { accessToken } = loginResponse.body

    return (
      request(app.getHttpServer())
        .get('/example/protected')
        .set('Authorization', 'Bearer ' + accessToken)
        // .expect('Content-Type', /json/
        //  FIXME: should be application/json
        .expect('Content-Type', 'text/html; charset=utf-8')
        .expect(200)
    )
  })
})
