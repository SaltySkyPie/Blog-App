import { ArticleService } from '@app/article/article.service'
import { JwtUser, UserService } from '@app/user/user.service'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateCommentInput } from './dto/create-comment.input'
import { UpdateCommentInput } from './dto/update-comment.input'
import { Comment } from './entities/comment.entity'

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
    private userService: UserService,
    private articleService: ArticleService
  ) {}

  async create(createCommentInput: CreateCommentInput, user: JwtUser) {
    const comment = this.commentRepository.create(createCommentInput)
    comment.user = await this.userService.findOneById(user.id)
    comment.article = await this.articleService.findOne(createCommentInput.articleId)
    const savedComment = await this.commentRepository.save(comment)
    return await this.findOne(savedComment.id)
  }

  findArticleAll(articleId: string, skip?: number, take?: number) {
    return this.commentRepository.find({
      where: {
        article: {
          id: articleId,
        },
      },
      skip,
      take,
      order: {
        createdAt: 'DESC',
      },
    })
  }

  findOne(id: string) {
    return this.commentRepository.findOneOrFail({
      where: { id },
    })
  }

  async update(id: string, updateCommentInput: UpdateCommentInput, user: JwtUser) {
    const comment = await this.findOne(id)

    if (comment.user.id !== user.id) {
      throw new Error('Not authorized')
    }

    await this.commentRepository.update({ id }, updateCommentInput)

    return await this.findOne(id)
  }

  async remove(id: string, user: JwtUser) {
    const comment = await this.findOne(id)

    if (comment.user.id !== user.id) {
      throw new Error('Not authorized')
    }

    await this.commentRepository.remove(comment)

    return true
  }
}
