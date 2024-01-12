import { Field, ID, InputType } from '@nestjs/graphql'

@InputType()
export class CreateCommentInput {
  @Field(() => ID)
  articleId: string

  @Field()
  content: string
}
