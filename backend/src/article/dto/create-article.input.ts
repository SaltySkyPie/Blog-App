import { Field, InputType } from '@nestjs/graphql'
import { ArticleState } from '../entities/article.entity'

@InputType()
export class CreateArticleInput {
  @Field()
  title: string

  @Field()
  perex: string

  @Field()
  content: string

  @Field({ nullable: true})
  imageUrl: string

  @Field(() => ArticleState, { defaultValue: ArticleState.DRAFT })
  state: ArticleState
}
