import { VoteType } from '@app/vote/entities/vote.entity'
import { Field, ID, InputType } from '@nestjs/graphql'

@InputType()
export class UpdateOrCreateVoteInput {

  @Field(() => VoteType, { nullable: true })
  type: VoteType

  @Field(() => ID, { nullable: true })
  commentId: string
}
