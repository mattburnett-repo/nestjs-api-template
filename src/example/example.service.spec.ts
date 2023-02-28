import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { CreateExampleDto } from './dto/create-example.dto'
import { Example } from './entities/example.entity'
import { ExampleService } from './example.service'

// https://github.com/jmcdo29/testing-nestjs/blob/main/apps/typeorm-sample/src/cat/cat.service.spec.ts

describe('ExampleService', () => {
  let service: ExampleService
  let repo: Repository<Example>

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

  const mockExampleRepository = {
    create: jest.fn().mockResolvedValue(mockExample),
    save: jest.fn().mockResolvedValue(mockExample),
    find: jest.fn().mockResolvedValue(mockExamples),
    findAll: jest.fn().mockResolvedValue(mockExamples),
    getProtected: jest.fn().mockImplementation(),
    findOneById: jest.fn().mockResolvedValue(mockExample),
    update: jest.fn().mockResolvedValue({ ...mockExample }),
    remove: jest.fn().mockResolvedValue(mockExample)
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExampleService,
        {
          provide: getRepositoryToken(Example),
          useValue: mockExampleRepository
        }
      ]
    }).compile()

    service = module.get<ExampleService>(ExampleService)
    repo = module.get<Repository<Example>>(getRepositoryToken(Example))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should have a protected resource', () => {
    expect(service.getProtected()).toEqual(
      'This is a protected resource. If you see this, authentication was successful.'
    )
  })
  it('should create an example', () => {
    expect(service.create(mockExample)).resolves.toEqual({
      id: '1',
      ...mockExample
    })
    expect(repo.create).toBeCalledTimes(1)
    expect(repo.create).toBeCalledWith({ ...mockExample })
    expect(repo.save).toBeCalledTimes(1)
  })

  it('should find all examples', () => {
    expect(service.findAll()).resolves.toEqual(mockExamples)
  })

  it('should find a example by id', () => {
    const repoSpy = jest.spyOn(repo, 'findOneById')
    expect(service.findOneById('1')).resolves.toEqual(mockExample)
    expect(service.findOneById('a uuid')).resolves.toEqual(mockExample)
    expect(repoSpy).toBeCalledWith('a uuid')
  })

  it('should update an example', () => {
    expect(service.update('1', mockExample)).resolves.toEqual({
      id: '1',
      ...mockExample
    })
  })

  it('should delete an example', () => {
    expect(service.remove('1')).resolves.toEqual({
      ...mockExample
    })
  })
})
