import { JwtUser, UserService } from '@app/user/user.service'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, Repository } from 'typeorm'
import { CreateArticleInput } from './dto/create-article.input'
import { UpdateArticleInput } from './dto/update-article.input'
import { Article, ArticleState } from './entities/article.entity'

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
    private userService: UserService
  ) {}

  async create(createArticleInput: CreateArticleInput, user: JwtUser) {
    const article = new Article()
    this.fillArticle(article, createArticleInput)
    article.user = await this.userService.findOneById(user.id)
    return await this.articleRepository.save(article)
  }

  findAll(options?: FindManyOptions<Article>) {
    return this.articleRepository.find({
      ...options,
    })
  }

  findOne(id: string) {
    return this.articleRepository.findOneOrFail({
      where: { id },
    })
  }

  findAvailableOne(id: string) {
    return this.articleRepository.findOneOrFail({
      where: {
        id,
        state: ArticleState.PUBLISHED || ArticleState.HIDDEN,
      },
      relations: {
        user: true,
      },
    })
  }

  findUserArticles(userId: string) {
    return this.articleRepository.find({
      relations: {
        user: true,
      },
      where: {
        user: {
          id: userId,
        },
      },
    })
  }

  async findUserArticle(id: string, userId: string) {
    const article = await this.articleRepository.findOneOrFail({
      relations: {
        user: true,
      },
      where: {
        id: id,
      },
    })

    console.log('userId', userId)
    console.log('article.user.id', article.user.id)

    if (article.user.id !== userId) {
      throw new Error('You are not the owner of this article')
    }
    return article
  }

  async update(id: string, updateArticleInput: UpdateArticleInput, user: JwtUser) {
    const article = await this.articleRepository.findOneOrFail({
      where: { id },
      relations: {
        user: true,
      },
    })
    if (article.user.id !== user.id) {
      throw new Error('You are not the owner of this article')
    }
    this.fillArticle(article, updateArticleInput)
    return await this.articleRepository.save(article)
  }

  async remove(id: string, user: JwtUser) {
    const article = await this.findUserArticle(id, user.id)
    await this.articleRepository.remove(article)
    return true
  }

  async changeState(id: string, state: ArticleState, user: JwtUser) {
    const article = await this.findUserArticle(id, user.id)
    article.state = state
    return await this.articleRepository.save(article)
  }

  private fillArticle(article: Article, input: CreateArticleInput | UpdateArticleInput) {
    article.title = input.title ?? article.title
    article.perex = input.perex ?? article.perex
    article.content = input.content ?? article.content
    article.imageUrl = input.imageUrl ?? article.imageUrl
    article.state = input.state ?? article.state
    return article
  }
}
