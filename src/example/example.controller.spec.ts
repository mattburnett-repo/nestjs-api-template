import { Test, TestingModule } from '@nestjs/testing'

import { ExampleController } from './example.controller'
import { CreateExampleDto } from './dto/create-example.dto'
import { ExampleService } from './example.service'

// https://github.com/jmcdo29/testing-nestjs/blob/main/apps/typeorm-sample/src/cat/cat.controller.spec.ts

describe('ExampleController', () => {
  let controller: ExampleController

  const mockExample: CreateExampleDto = {
    id: '1',
    testString: 'testString',
    testNumber: 1,
    testBoolean: true,
    isActive: true
  }
  const mockExamples: CreateExampleDto[] = [
    {
      id: '1',
      testString: 'testString',
      testNumber: 1,
      testBoolean: true,
      isActive: true
    },
    {
      id: '2',
      testString: 'testString',
      testNumber: 2,
      testBoolean: true,
      isActive: true
    }
  ]

  const mockExampleService = {
    create: jest.fn().mockResolvedValue(mockExample),
    getProtected: jest
      .fn()
      .mockImplementation(() => 'This is a protected resource'),
    findAll: jest.fn().mockResolvedValue(mockExamples),
    findOneById: jest.fn().mockResolvedValue(mockExample),
    update: jest.fn().mockResolvedValue(mockExample),
    delete: jest.fn().mockResolvedValue(mockExample),
    remove: jest.fn().mockResolvedValue(mockExample)
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExampleController],
      providers: [ExampleService]
    })
      .overrideProvider(ExampleService)
      .useValue(mockExampleService)
      .compile()

    controller = module.get<ExampleController>(ExampleController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
  it('should have a protected resource', () => {
    expect(controller.getProtected()).toBe('This is a protected resource')
  })

  it('should get all', async () => {
    expect(controller.create(mockExample)).resolves.toEqual({
      ...mockExample
    })
  })
  it('should get one by id', async () => {
    expect(controller.findOneById(mockExample.id)).resolves.toEqual(mockExample)
  })
  it('should add one', async () => {
    expect(controller.create(mockExample)).resolves.toEqual({
      ...mockExample
    })
  })
  it('should update one', async () => {
    expect(controller.update('1', mockExample)).resolves.toEqual({
      ...mockExample
    })
  })
  it('should delete one', async () => {
    expect(controller.remove('1')).resolves.toEqual({
      ...mockExample
    })
  })
})
