import { VoteType } from '@app/vote/entities/vote.entity'
import { Field, ID, InputType } from '@nestjs/graphql'
import { IsEnum, IsNotEmpty, IsString, IsUUID, ValidateIf } from 'class-validator'

@InputType()
export class UpdateOrCreateVoteInput {
  @Field(() => VoteType, { nullable: true })
  @ValidateIf((o) => o.type !== null)
  @IsEnum(VoteType, {
    message: 'type must be a valid enum value',
  })
  type: VoteType

  @Field(() => ID)
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  commentId: string
}
