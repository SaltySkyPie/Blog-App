import { Article } from '@app/article/entities/article.entity'
import { RandomGenerator } from '@app/utils/generator'
import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

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

  @OneToMany(() => Article, (article) => article.user, {
    cascade: true,
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
  })
  @Field(() => [Article])
  articles: Article[]
}
