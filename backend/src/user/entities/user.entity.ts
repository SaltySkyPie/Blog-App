import { Comment } from '@app/comment/entities/comment.entity'
import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql'
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Article } from '../../article/entities/article.entity'
import { RandomGenerator } from '../../utils/generator'

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string = RandomGenerator.uuid()

  @Column({ unique: true })
  @Field()
  username: string

  @Column()
  @Field()
  firstName: string

  @Column()
  @Field()
  lastName: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  middleName?: string

  @Column()
  password: string

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

  @OneToMany(() => Article, (article) => article.user, {
    cascade: true,
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
  })
  @Field(() => [Article], { nullable: true })
  articles: Article[]

  @OneToMany(() => Comment, (comment) => comment.user, {
    cascade: true,
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
  })
  @Field(() => [Comment], { nullable: true })
  comments: Comment[]
}
