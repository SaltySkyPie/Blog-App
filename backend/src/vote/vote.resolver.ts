import { Args, ID, Mutation, Resolver } from '@nestjs/graphql'
import { CreateVoteInput } from './dto/create-vote.input'
import { UpdateVoteInput } from './dto/update-vote.input'
import { Vote } from './entities/vote.entity'
import { VoteService } from './vote.service'
import { CurrentUser } from '@app/auth/decorators/current-user.decorator'
import { JwtUser } from '@app/user/user.service'

@Resolver(() => Vote)
export class VoteResolver {
  constructor(private readonly voteService: VoteService) {}

  @Mutation(() => Vote)
  createVote(@Args('createVoteInput') createVoteInput: CreateVoteInput, @CurrentUser() user: JwtUser) {
    return this.voteService.create(createVoteInput, user)
  }

  @Mutation(() => Vote)
  updateVote(@Args('updateVoteInput') updateVoteInput: UpdateVoteInput, @CurrentUser() user: JwtUser) {
    return this.voteService.update(updateVoteInput.id, updateVoteInput, user)
  }

  @Mutation(() => Boolean)
  removeVote(@Args('id', { type: () => ID }) id: string, @CurrentUser() user: JwtUser) {
    return this.voteService.remove(id, user)
  }
}
