import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreateVoteInput } from './dto/create-vote.input'
import { UpdateVoteInput } from './dto/update-vote.input'
import { Vote } from './entities/vote.entity'
import { VoteService } from './vote.service'

@Resolver(() => Vote)
export class VoteResolver {
  constructor(private readonly voteService: VoteService) {}

  @Mutation(() => Vote)
  createVote(@Args('createVoteInput') createVoteInput: CreateVoteInput) {
    return this.voteService.create(createVoteInput)
  }

  @Query(() => [Vote], { name: 'vote' })
  findAll() {
    return this.voteService.findAll()
  }

  @Query(() => Vote, { name: 'vote' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.voteService.findOne(id)
  }

  @Mutation(() => Vote)
  updateVote(@Args('updateVoteInput') updateVoteInput: UpdateVoteInput) {
    return this.voteService.update(updateVoteInput.id, updateVoteInput)
  }

  @Mutation(() => Vote)
  removeVote(@Args('id', { type: () => Int }) id: number) {
    return this.voteService.remove(id)
  }
}
