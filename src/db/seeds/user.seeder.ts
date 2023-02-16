import { Seeder, SeederFactoryManager } from 'typeorm-extension'
import { DataSource } from 'typeorm'
import { User } from '../../users/entities/user.entity'

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    const userFactory = await factoryManager.get(User)
    const numRecords = 3

    // save numRecords factory generated entities, to the database
    await userFactory.saveMany(numRecords)
  }
}
