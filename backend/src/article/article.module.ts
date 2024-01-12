import { UserModule } from '@app/user/user.module'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ArticleResolver } from './article.resolver'
import { ArticleService } from './article.service'
import { Article } from './entities/article.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Article]), UserModule],
  providers: [ArticleResolver, ArticleService],
  exports: [ArticleService],
})
export class ArticleModule {}
