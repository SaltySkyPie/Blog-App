import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty, IsString, Length, ValidateIf } from 'class-validator'

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
  @ValidateIf((o) => o.middleName !== '' || o.middleName !== null)
  @IsString()
  middleName?: string

  @Field()
  @IsString()
  @Length(6)
  @IsNotEmpty()
  password: string

  @Field()
  @IsString()
  @Length(6)
  @IsNotEmpty()
  passwordConfirmation: string
}
