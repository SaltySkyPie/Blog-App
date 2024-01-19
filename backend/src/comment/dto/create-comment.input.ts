import { Field, ID, InputType } from '@nestjs/graphql'
import { IsNotEmpty, IsString, IsUUID, Length } from 'class-validator'

@InputType()
export class CreateCommentInput {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  @Field(() => ID)
  articleId: string

  @Field()
  @IsString()
  @Length(1)
  @IsNotEmpty()
  content: string
}
