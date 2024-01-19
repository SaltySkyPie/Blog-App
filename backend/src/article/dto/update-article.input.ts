import { Field, ID, InputType, PartialType } from '@nestjs/graphql'
import { CreateArticleInput } from './create-article.input'
import { IsNotEmpty, IsString, IsUUID } from 'class-validator'

@InputType()
export class UpdateArticleInput extends PartialType(CreateArticleInput) {
  @Field(() => ID)
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  id: string
}
