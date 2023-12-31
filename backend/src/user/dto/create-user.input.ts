import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty, IsString, Length } from 'class-validator'

@InputType()
export class CreateUserInput {
  @Field()
  @IsString()
  @Length(3, 20)
  @IsNotEmpty()
  username: string

  @Field()
  @IsString()
  @Length(1)
  @IsNotEmpty()
  firstName: string

  @Field()
  @IsString()
  @Length(1)
  @IsNotEmpty()
  lastName: string

  @Field({ nullable: true })
  middleName?: string

  @Field()
  @IsString()
  @Length(6)
  @IsNotEmpty()
  password: string
}
