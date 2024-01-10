import { Article } from '@app/article/entities/article.entity'
import { User } from '@app/user/entities/user.entity'
import { RandomGenerator } from '@app/utils/generator'
import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql'
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@ObjectType()
@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string = RandomGenerator.uuid()

  @Field()
  @Column('text')
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

  @ManyToOne(() => User, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'userId',
  })
  @Field(() => User)
  user: User

  @ManyToOne(() => Article, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'articleId',
  })
  @Field(() => Article)
  article: Article
}
