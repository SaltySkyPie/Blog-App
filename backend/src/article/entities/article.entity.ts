import { RandomGenerator } from '@app/utils/generator'
import { Field, GraphQLISODateTime, ID, ObjectType, registerEnumType } from '@nestjs/graphql'
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

export enum ArticleState {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  PRIVATE = 'private',
  HIDDEN = 'hidden',
  DELETED = 'deleted',
}
registerEnumType(ArticleState, {
  name: 'ArticleState',
})

@Entity()
@ObjectType()
export class Article {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string = RandomGenerator.uuid()

  @Field()
  @Column({
    length: 255,
  })
  title: string

  @Field()
  @Column('text')
  perex: string

  @Field()
  @Column('longtext')
  content: string

  @CreateDateColumn({
    name: 'createdAt',
  })
  @Field(() => GraphQLISODateTime)
  createdAt: Date

  @UpdateDateColumn({
    name: 'updatedAt',
  })
  @Field(() => GraphQLISODateTime)
  updatedAt: Date

  @Field(() => ArticleState)
  @Column({
    type: 'enum',
    enum: ArticleState,
    default: ArticleState.DRAFT,
  })
  state: ArticleState
}
