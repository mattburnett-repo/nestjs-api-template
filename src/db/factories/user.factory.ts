import { setSeederFactory } from 'typeorm-extension'
import { User } from '../../users/entities/user.entity'

export default setSeederFactory(User, (faker) => {
  const user = new User()

  user.name = faker.name.fullName()
  user.username = faker.internet.userName()
  user.password = 'password'
  user.email = faker.internet.email()

  return user
})
