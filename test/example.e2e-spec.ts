import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import { getRepositoryToken } from '@nestjs/typeorm'

import * as request from 'supertest'

import { ExampleModule } from '../src/example/example.module'
import { Example } from '../src/example/entities/example.entity'
import { CreateExampleDto } from '../src/example/dto/create-example.dto'

// NestJS unit / integration intro:
//    https://www.youtube.com/watch?v=dXOfOgFFKuY&t=776s

describe('ExampleController (e2e)', () => {
  let app: INestApplication

  const mockExample: CreateExampleDto = {
    id: '1c027e94-d9dc-45f6-8661-7e26891aacd5',
    testString: 'testString',
    testNumber: 123,
    testBoolean: false,
    isActive: true,
    name: 'testName',
    description: 'testDescription'
  }

  const mockExamples: CreateExampleDto[] = [
    {
      id: '1c027e94-d9dc-45f6-8661-7e26891aacd5',
      testString: 'testString',
      testNumber: 123,
      testBoolean: false,
      isActive: true,
      name: 'testName1',
      description: 'testDescription'
    },
    {
      id: '961dc517-49a7-42af-9fbb-226a18138b6f',
      testString: 'testString',
      testNumber: 123,
      testBoolean: false,
      isActive: true,
      name: 'testName',
      description: 'testDescription'
    }
  ]

  // actual database connection can go here
  const mockExamplesRepository = {
    find: jest.fn().mockResolvedValue(mockExamples),
    findOneById: jest.fn().mockResolvedValue(mockExample),
    create: jest.fn().mockResolvedValue(mockExample),
    save: jest.fn().mockResolvedValue(mockExample),
    update: jest.fn().mockResolvedValue(mockExample),
    delete: jest.fn().mockResolvedValue(mockExample),
    remove: jest.fn().mockResolvedValue(mockExample)
  }

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ExampleModule]
    })
      .overrideProvider(getRepositoryToken(Example))
      .useValue(mockExamplesRepository)
      .compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  afterEach(async () => {
    await app.close()
  })

  it('/example (POST)', () => {
    return request(app.getHttpServer())
      .post('/example')
      .send({ mockExample })
      .expect('Content-Type', /json/)
      .expect(201)
      .then((res) => {
        expect(res.body).toEqual({
          ...mockExample
        })
      })
  })

  it('/example (GET)', () => {
    return request(app.getHttpServer())
      .get('/example')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(mockExamples)
  })

  it('GET handles bad id value', () => {
    return request(app.getHttpServer())
      .get('/example/id/1')
      .expect('Content-Type', /json/)
      .expect(400)
  })

  it('/example/id/:id (GET)', () => {
    return request(app.getHttpServer())
      .get('/example/id/1c027e94-d9dc-45f6-8661-7e26891aacd5')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual({ ...mockExample })
      })
  })

  it('PATCH handles bad id value', () => {
    return request(app.getHttpServer())
      .patch('/example/id/1')
      .expect('Content-Type', /json/)
      .expect(400)
  })
  it('/example/ud/:id (PATCH', () => {
    return request(app.getHttpServer())
      .patch('/example/id/1c027e94-d9dc-45f6-8661-7e26891aacd5')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual({ ...mockExample })
      })
  })

  it('DELETE handles bad id value', () => {
    return request(app.getHttpServer())
      .delete('/example/id/1')
      .expect('Content-Type', /json/)
      .expect(400)
  })
  it('/example/id/:id (DELETE)', () => {
    return request(app.getHttpServer())
      .delete('/example/id/1c027e94-d9dc-45f6-8661-7e26891aacd5')
      .expect(200)
  })
})
