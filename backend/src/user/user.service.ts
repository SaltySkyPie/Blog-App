import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateUserInput } from './dto/create-user.input'
import { UpdateUserInput } from './dto/update-user.input'
import { User } from './entities/user.entity'

export type JwtUser = Omit<Omit<User, 'password'>, 'articles'>

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async create(createUserInput: CreateUserInput) {
    const notUnique = await this.userRepository.findOne({ where: { username: createUserInput.username } })

    if (notUnique) {
      throw new Error('Username already exists')
    }

    const user = new User()
    this.fillUser(user, createUserInput)
    return this.userRepository.save(user)
  }

  async findOneById(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
    })

    if (!user) {
      throw new Error('User not found')
    }

    return user
  }

  findOneByUsername(username: string) {
    const user = this.userRepository.findOne({
      where: { username },
    })

    if (!user) {
      throw new Error('User not found')
    }

    return user
  }

  async update(id: string, updateUserInput: UpdateUserInput) {
    return this.userRepository.save(this.fillUser(await this.findOneById(id), updateUserInput))
  }

  private fillUser(user: User, input: CreateUserInput | UpdateUserInput) {
    user.username = input.username ?? user.username
    user.password = input.password ?? user.password
    user.firstName = input.firstName ?? user.firstName
    user.lastName = input.lastName ?? user.lastName
    user.middleName = input.middleName ?? user.middleName
    return user
  }
}
