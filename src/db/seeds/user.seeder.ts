import { Seeder, SeederFactoryManager } from 'typeorm-extension'
import { DataSource } from 'typeorm'
import { User } from '../../users/entities/user.entity'

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    const userFactory = await factoryManager.get(User)
    const repository = dataSource.getRepository(User)

    const numRecords = 3

    //  create test user
    const testUser = new User()

    testUser.name = 'Test One'
    testUser.username = 'testOne'
    testUser.password = 'testOne'
    testUser.email = 'test@one.com'

    await repository.save(testUser)

    // save numRecords factory generated entities, to the database
    await userFactory.saveMany(numRecords)
  }
}
