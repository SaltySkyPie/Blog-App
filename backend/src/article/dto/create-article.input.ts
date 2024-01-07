import { Field, InputType } from '@nestjs/graphql'
import { ArticleState } from '../entities/article.entity'
import { Length } from 'class-validator'

@InputType()
export class CreateArticleInput {
  @Length(3, 255)
  @Field()
  title: string

  @Length(5, 1000)
  @Field()
  perex: string

  @Length(25)
  @Field()
  content: string

  @Field({ nullable: true})
  imageUrl?: string

  @Field(() => ArticleState)
  state: ArticleState
}
