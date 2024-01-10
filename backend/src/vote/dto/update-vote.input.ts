import { Field, InputType, Int, PartialType } from '@nestjs/graphql'
import { CreateVoteInput } from './create-vote.input'

@InputType()
export class UpdateVoteInput extends PartialType(CreateVoteInput) {
  @Field(() => Int)
  id: number
}
