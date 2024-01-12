import { Field, ID, InputType, PartialType } from '@nestjs/graphql'
import { CreateVoteInput } from './create-vote.input'

@InputType()
export class UpdateVoteInput extends PartialType(CreateVoteInput) {
  @Field(() => ID)
  id: string
}
