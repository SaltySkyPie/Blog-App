import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateVoteInput } from './dto/create-vote.input'
import { UpdateVoteInput } from './dto/update-vote.input'
import { Vote } from './entities/vote.entity'
import { JwtUser, UserService } from '@app/user/user.service'
import { CommentService } from '@app/comment/comment.service'

@Injectable()
export class VoteService {
  constructor(@InjectRepository(Vote) private voteRepository: Repository<Vote>,
    private userService: UserService,
    private commentService: CommentService
  ) {}

  async create(createVoteInput: CreateVoteInput, user: JwtUser) {
    const vote = this.voteRepository.create(createVoteInput)
    vote.user = await this.userService.findOneById(user.id)
    vote.comment = await this.commentService.findOne(createVoteInput.commentId)
    return this.voteRepository.save(vote)
  }

  findAll() {
    return this.voteRepository.find()
  }

  findOne(id: string) {
    return this.voteRepository.findOneOrFail({
      where: { id },
    })
  }

  async update(id: string, updateVoteInput: UpdateVoteInput, user: JwtUser) {
    const vote = await this.findOne(id)
    if (vote.user.id !== user.id) {
      throw new Error('You are not allowed to update this vote')
    }
    
    await this.voteRepository.update({ id }, updateVoteInput)

    return await this.findOne(id)
  }

  async remove(id: string, user: JwtUser) {
    const vote = await this.findOne(id)

    if (vote.user.id !== user.id) {
      throw new Error('You are not allowed to remove this vote')
    }

    await this.voteRepository.remove(vote)

    return true
  }
}
