import { Field, ID, InputType, PartialType } from '@nestjs/graphql'
import { IsNotEmpty, IsString, IsUUID } from 'class-validator'
import { CreateUserInput } from './create-user.input'

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => ID)
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  id: string
}
