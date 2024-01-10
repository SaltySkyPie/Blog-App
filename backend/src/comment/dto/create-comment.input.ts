import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class CreateCommentInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number
}
