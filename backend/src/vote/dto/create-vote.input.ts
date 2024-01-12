import { VoteType } from '@app/vote/entities/vote.entity'
import { Field, ID, InputType } from '@nestjs/graphql'

@InputType()
export class CreateVoteInput {
  @Field(() => VoteType)
  type: VoteType

  @Field(() => ID)
  commentId: string
}
