import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateArticleInput } from './dto/create-article.input'
import { UpdateArticleInput } from './dto/update-article.input'
import { Article, ArticleState } from './entities/article.entity'

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>
  ) {}

  async create(createArticleInput: CreateArticleInput) {
    const article = new Article()
    this.fillArticle(article, createArticleInput)
    return await this.articleRepository.save(article)
  }

  findAll() {
    return this.articleRepository.find({
      order: {
        createdAt: 'DESC',
      },
    })
  }

  findOne(id: string) {
    return this.articleRepository.findOneOrFail({
      where: { id },
    })
  }

  async update(id: string, updateArticleInput: UpdateArticleInput) {
    const article = await this.articleRepository.findOneOrFail({
      where: { id },
    })
    this.fillArticle(article, updateArticleInput)
    return await this.articleRepository.save(article)
  }

  async remove(id: string) {
    await this.articleRepository.delete(id)
    return true
  }

  async changeState(id: string, state: ArticleState) {
    const article = await this.articleRepository.findOneOrFail({
      where: { id },
    })
    article.state = state
    return await this.articleRepository.save(article)
  }

  private fillArticle(article: Article, input: CreateArticleInput | UpdateArticleInput) {
    article.title = input.title ?? article.title
    article.perex = input.perex ?? article.perex
    article.content = input.content ?? article.content
    return article
  }
}
