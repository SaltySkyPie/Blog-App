import { ArticleModule } from '@app/article/article.module'
import { UserModule } from '@app/user/user.module'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CommentResolver } from './comment.resolver'
import { CommentService } from './comment.service'
import { Comment } from './entities/comment.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), UserModule, ArticleModule],
  providers: [CommentResolver, CommentService],
  exports: [CommentService],
})
export class CommentModule {}
