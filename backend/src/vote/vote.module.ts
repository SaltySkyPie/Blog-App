import { CommentModule } from '@app/comment/comment.module'
import { UserModule } from '@app/user/user.module'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Vote } from './entities/vote.entity'
import { VoteResolver } from './vote.resolver'
import { VoteService } from './vote.service'

@Module({
  imports: [TypeOrmModule.forFeature([Vote]), CommentModule, UserModule],
  providers: [VoteResolver, VoteService],
  exports: [VoteService],
})
export class VoteModule {}
