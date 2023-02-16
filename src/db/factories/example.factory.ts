import { setSeederFactory } from 'typeorm-extension'
import { Example } from '../../example/entities/example.entity'

export default setSeederFactory(Example, (faker) => {
  const example = new Example()

  example.testString = faker.word.noun()
  example.testNumber = faker.datatype.number()
  example.isActive = faker.datatype.boolean()
  example.description = faker.lorem.sentence(5)

  return example
})
