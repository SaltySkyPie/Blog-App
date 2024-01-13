import { CurrentUser } from '@app/auth/decorators/current-user.decorator'
import { JwtUser } from '@app/user/user.service'
import { Args, ID, Mutation, Resolver } from '@nestjs/graphql'
import { UpdateOrCreateVoteInput} from './dto/update-or-create-vote.input'
import { Vote } from './entities/vote.entity'
import { VoteService } from './vote.service'

@Resolver(() => Vote)
export class VoteResolver {
  constructor(private readonly voteService: VoteService) {}

  @Mutation(() => Vote, { nullable: true })
  updateOrCreateVote(@Args('updateOrCreateVoteInput') updateOrCreateVoteInput: UpdateOrCreateVoteInput, @CurrentUser() user: JwtUser) {
    return this.voteService.updateOrCreate(updateOrCreateVoteInput, user)
  }
}
