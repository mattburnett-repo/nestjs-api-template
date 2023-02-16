import { Seeder, SeederFactoryManager } from 'typeorm-extension'
import { DataSource } from 'typeorm'
import { Example } from '../../example/entities/example.entity'

export default class ExampleSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    const exampleFactory = await factoryManager.get(Example)
    const numRecords = 5

    // save numRecords factory generated entities, to the database
    await exampleFactory.saveMany(numRecords)
  }
}
