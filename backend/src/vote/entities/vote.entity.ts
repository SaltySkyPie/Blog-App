import { User } from '@app/user/entities/user.entity'
import { RandomGenerator } from '@app/utils/generator'
import { Field, GraphQLISODateTime, ID, ObjectType, registerEnumType } from '@nestjs/graphql'
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Comment } from '@app/comment/entities/comment.entity'


export enum VoteType {
  UP = 'up',
  DOWN = 'down',
}
registerEnumType(VoteType, {
  name: 'VoteType',
})

@ObjectType()
@Entity()
export class Vote {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string = RandomGenerator.uuid()

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

  @Field(() => VoteType)
  @Column({
    type: 'enum',
    enum: VoteType,
    default: VoteType.UP,
  })
  type: VoteType

  @ManyToOne(() => User, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'userId',
  })
  @Field(() => User)
  user: User

  @ManyToOne(() => Comment, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'commentId',
  })
  @Field(() => Comment)
  comment: Comment
}
