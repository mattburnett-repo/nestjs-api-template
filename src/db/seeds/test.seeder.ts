import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Test } from '../../test/entities/test.entity';

export default class TestSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const testFactory = await factoryManager.get(Test);

    // save 5 factory generated entities, to the database
    await testFactory.saveMany(5);
  }
}
