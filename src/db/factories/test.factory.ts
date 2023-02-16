import { setSeederFactory } from 'typeorm-extension';
import { Test } from '../../test/entities/test.entity';

export default setSeederFactory(Test, (faker) => {
  const test = new Test();
  test.testString = faker.word.noun();
  test.testNumber = faker.datatype.number();
  test.isActive = faker.datatype.boolean();
  test.description = faker.lorem.sentence(5);

  return test;
});
