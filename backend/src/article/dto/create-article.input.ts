import { Field, InputType } from '@nestjs/graphql'
import { IsEnum, IsString, IsUrl, Length } from 'class-validator'
import { ArticleState } from '../entities/article.entity'

@InputType()
export class CreateArticleInput {
  @Length(3, 255)
  @IsString()
  @Field()
  title: string

  @Length(5, 1000)
  @IsString()
  @Field()
  perex: string

  @Length(25)
  @IsString()
  @Field()
  content: string

  @Field({ nullable: true })
  @IsUrl()
  @IsString()
  imageUrl?: string

  @Field(() => ArticleState)
  @IsEnum(ArticleState)
  state: ArticleState
}
