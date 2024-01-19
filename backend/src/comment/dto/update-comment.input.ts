import { Field, ID, InputType, PartialType } from '@nestjs/graphql'
import { CreateCommentInput } from './create-comment.input'
import { IsNotEmpty, IsString, IsUUID } from 'class-validator'

@InputType()
export class UpdateCommentInput extends PartialType(CreateCommentInput) {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  @Field(() => ID)
  id: string
}
