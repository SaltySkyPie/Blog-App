import { Args, ID, Query, Resolver } from '@nestjs/graphql'
import { User } from './entities/user.entity'
import { JwtUser, UserService } from './user.service'
import { CurrentUser } from '@app/auth/decorators/current-user.decorator'

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.userService.findOneById(id)
  }

  @Query(() => User, { name: 'me' })
  me(@CurrentUser() user: JwtUser) {
    return this.userService.findOneById(user.id)
  }
}
