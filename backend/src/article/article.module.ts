import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ArticleResolver } from './article.resolver'
import { ArticleService } from './article.service'
import { Article } from './entities/article.entity'
import { UserModule } from '@app/user/user.module'

@Module({
  imports: [TypeOrmModule.forFeature([Article]), UserModule],
  providers: [ArticleResolver, ArticleService],
})
export class ArticleModule {}
