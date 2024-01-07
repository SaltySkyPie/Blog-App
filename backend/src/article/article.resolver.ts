import { CurrentUser } from '@app/auth/decorators/current-user.decorator'
import { Public } from '@app/auth/decorators/public.decorator'
import { JwtUser } from '@app/user/user.service'
import { Args, ID, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ArticleService } from './article.service'
import { CreateArticleInput } from './dto/create-article.input'
import { UpdateArticleInput } from './dto/update-article.input'
import { Article, ArticleState } from './entities/article.entity'

@Resolver(() => Article)
export class ArticleResolver {
  constructor(private readonly articleService: ArticleService) {}

  @Mutation(() => Article)
  async createArticle(@Args('createArticleInput') createArticleInput: CreateArticleInput, @CurrentUser() user: JwtUser) {
    return await this.articleService.create(createArticleInput, user)
  }

  @Query(() => [Article], { name: 'articles' })
  @Public()
  async findAll() {
    return await this.articleService.findAll({
      where: {
        state: ArticleState.PUBLISHED,
      },
      relations: {
        user: true,
      },
      order: {
        createdAt: 'DESC',
      },
    })
  }

  @Query(() => Article, { name: 'article' })
  @Public()
  async findOne(@Args('id', { type: () => ID }) id: string) {
    return await this.articleService.findAvailableOne(id)
  }

  @Query(() => [Article], { name: 'userArticles' })
  async findUserArticles(@CurrentUser() user: JwtUser) {
    return await this.articleService.findUserArticles(user.id)
  }

  @Query(() => Article, { name: 'userArticle' })
  async findUserArticle(@Args('id', { type: () => ID }) id: string, @CurrentUser() user: JwtUser) {
    return await this.articleService.findUserArticle(id, user.id)
  }

  @Mutation(() => Article)
  async updateArticle(@Args('updateArticleInput') updateArticleInput: UpdateArticleInput, @CurrentUser() user: JwtUser) {
    return await this.articleService.update(updateArticleInput.id, updateArticleInput, user)
  }

  @Mutation(() => Boolean)
  async removeArticle(@Args('id', { type: () => Int }) id: string, @CurrentUser() user: JwtUser) {
    return await this.articleService.remove(id, user)
  }

  @Mutation(() => Article)
  async changeState(
    @Args('id', { type: () => ID }) id: string,
    @Args('state', { type: () => ArticleState }) state: ArticleState,
    @CurrentUser() user: JwtUser
  ) {
    return await this.articleService.changeState(id, state, user)
  }
}
