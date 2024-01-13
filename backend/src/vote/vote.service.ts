import { CommentService } from '@app/comment/comment.service'
import { Comment } from '@app/comment/entities/comment.entity'
import { JwtUser, UserService } from '@app/user/user.service'
import { Inject, Injectable, forwardRef } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UpdateOrCreateVoteInput } from './dto/update-or-create-vote.input'
import { Vote, VoteType } from './entities/vote.entity'

@Injectable()
export class VoteService {
  constructor(
    @InjectRepository(Vote) private voteRepository: Repository<Vote>,
    private userService: UserService,
    @Inject(forwardRef(() => CommentService))
    private commentService: CommentService
  ) {}

  async updateOrCreate(updateOrCreateVoteInput: UpdateOrCreateVoteInput, user: JwtUser) {
    const { commentId, type } = updateOrCreateVoteInput

    const vote = await this.voteRepository.findOne({
      where: {
        comment: {
          id: commentId,
        },
        user: {
          id: user.id,
        },
      },
    })

    if (!type) {
      if (vote) {
        return await this.voteRepository.remove(vote)
      }

      return null
    }

    if (vote) {
      vote.type = type
      return this.voteRepository.save(vote)
    }

    const newVote = this.voteRepository.create(updateOrCreateVoteInput)

    newVote.user = await this.userService.findOneById(user.id)

    newVote.comment = await this.commentService.findOne(commentId)

    return this.voteRepository.save(newVote)
  }

  findAll() {
    return this.voteRepository.find()
  }

  findOne(id: string) {
    return this.voteRepository.findOneOrFail({
      where: { id },
    })
  }

  async remove(id: string, user: JwtUser) {
    const vote = await this.findOne(id)

    if (vote.user.id !== user.id) {
      throw new Error('You are not allowed to remove this vote')
    }

    await this.voteRepository.remove(vote)

    return true
  }

  async hasVoted(comment: Comment, user: JwtUser, type: VoteType) {
    const vote = await this.voteRepository.findOne({
      where: {
        comment: {
          id: comment.id,
        },
        user: {
          id: user.id,
        },
        type,
      },
    })

    return !!vote
  }

  async countVotes(commentId: string, type: VoteType) {
    return await this.voteRepository.count({
      where: {
        comment: {
          id: commentId,
        },
        type,
      },
    })
  }
}
