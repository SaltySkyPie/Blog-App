import { CurrentUser } from '@app/auth/decorators/current-user.decorator'
import { Public } from '@app/auth/decorators/public.decorator'
import { JwtUser } from '@app/user/user.service'
import { VoteType, VoteTypeCount } from '@app/vote/entities/vote.entity'
import { Args, ID, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { CommentService } from './comment.service'
import { CreateCommentInput } from './dto/create-comment.input'
import { UpdateCommentInput } from './dto/update-comment.input'
import { Comment } from './entities/comment.entity'

@Resolver(() => Comment)
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @Mutation(() => Comment)
  createComment(@Args('createCommentInput') createCommentInput: CreateCommentInput, @CurrentUser() user: JwtUser) {
    return this.commentService.create(createCommentInput, user)
  }

  @Mutation(() => Comment)
  updateComment(@Args('updateCommentInput') updateCommentInput: UpdateCommentInput, @CurrentUser() user: JwtUser) {
    return this.commentService.update(updateCommentInput.id, updateCommentInput, user)
  }

  @Mutation(() => Boolean)
  removeComment(@Args('id', { type: () => ID }) id: string, @CurrentUser() user: JwtUser) {
    return this.commentService.remove(id, user)
  }

  @Public()
  @Query(() => [Comment], { name: 'articleComments' })
  findArticleAll(
    @Args('articleId', { type: () => ID }) articleId: string,
    @Args('skip', { nullable: true }) skip?: number,
    @Args('take', { nullable: true }) take?: number
  ) {
    return this.commentService.findArticleAll(articleId, skip, take)
  }

  @ResolveField('voteTypeCounts', () => [VoteTypeCount])
  async votes(@Parent() comment: Comment) {
    // i know this is not the best way to do this,
    // but since i dont have much time to do this, i'll explain the correct way to do this

    // the correct way to do this is to store the vote count in the comment table as another column(s)
    // and update it whenever a vote is created or deleted, instead of querying the vote table everytime
    // and maintain the info of user who voted for the comment in the vote table

    // the pros of this is that it will be much faster to query the vote count
    // the cons of this is that it will be harder to maintain the vote count when a vote is created or deleted and another column(s) is needed
    const voteCounts: VoteTypeCount[] = []

    for (const voteType of Object.values(VoteType)) {
      const count = await this.commentService.countVotes(comment.id, voteType)
      voteCounts.push({
        type: voteType,
        count,
      })
    }

    return voteCounts
  }
}
