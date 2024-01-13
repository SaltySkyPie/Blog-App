import { CommentModule } from '@app/comment/comment.module'
import { UserModule } from '@app/user/user.module'
import { Module, forwardRef } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Vote } from './entities/vote.entity'
import { VoteResolver } from './vote.resolver'
import { VoteService } from './vote.service'

@Module({
  imports: [TypeOrmModule.forFeature([Vote]), UserModule, forwardRef(() => CommentModule)],
  providers: [VoteResolver, VoteService],
  exports: [VoteService],
})
export class VoteModule {}
