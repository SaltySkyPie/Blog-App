import { Args, ID, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ArticleService } from './article.service'
import { CreateArticleInput } from './dto/create-article.input'
import { UpdateArticleInput } from './dto/update-article.input'
import { Article, ArticleState } from './entities/article.entity'

@Resolver(() => Article)
export class ArticleResolver {
  constructor(private readonly articleService: ArticleService) {}

  @Mutation(() => Article)
  async createArticle(@Args('createArticleInput') createArticleInput: CreateArticleInput) {
    return await this.articleService.create(createArticleInput)
  }

  @Query(() => [Article], { name: 'articles' })
  async findAll() {
    return await this.articleService.findAll()
  }

  @Query(() => Article, { name: 'article' })
  async findOne(@Args('id', { type: () => ID }) id: string) {
    return await this.articleService.findOne(id)
  }

  @Mutation(() => Article)
  async updateArticle(@Args('updateArticleInput') updateArticleInput: UpdateArticleInput) {
    return await this.articleService.update(updateArticleInput.id, updateArticleInput)
  }

  @Mutation(() => Boolean)
  async removeArticle(@Args('id', { type: () => Int }) id: string) {
    return await this.articleService.remove(id)
  }

  @Mutation(() => Article)
  async changeState(@Args('id', { type: () => ID }) id: string, @Args('state', { type: () => ArticleState }) state: ArticleState) {
    return await this.articleService.changeState(id, state)
  }
}
