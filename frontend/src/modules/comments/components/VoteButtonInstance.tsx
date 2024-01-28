import { GetArticleCommentsQuery, VoteType, useVoteArticleCommentMutation } from '@app/graphql/types'
import { useProfile } from '@app/modules/auth/utils/useProfile'
import { Box, IconButton, Tooltip, Typography } from '@mui/material'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { VoteTypeIcons } from './VoteTypeIcons'

export default function VoteButtonInstance({
  voteTypeCount,
  commentId,
}: {
  voteTypeCount: GetArticleCommentsQuery['articleComments'][0]['voteTypeCounts'][0]
  commentId: string
}) {
  const { type, voted, count } = voteTypeCount
  const iconObj = VoteTypeIcons[type]
  const Icon = voted ? iconObj.active : iconObj.inactive
  const user = useProfile()
  const { t } = useTranslation()

  // Setup vote mutation and user profile hook
  const [vote] = useVoteArticleCommentMutation({
    update(cache, { data }) {
      if (!data) return
      const newComment = data.updateOrCreateVote?.comment
      if (!newComment) return

      cache.modify({
        id: cache.identify({
          __typename: 'Comment',
          id: newComment.id,
        }),
        fields: {
          voteTypeCounts() {
            return newComment.voteTypeCounts
          },
        },
      })
    },
  })

  // Define the handleVote callback
  const handleVote = useCallback(
    async (type: VoteType | null) => {
      if (!user) return

      await vote({
        variables: {
          input: {
            commentId: commentId,
            type,
          },
        },
      })
    },
    [user, vote, commentId]
  )

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Tooltip title={user ? t('vote' + type[0].toUpperCase() + type.slice(1).toLocaleLowerCase()) : t('needLoginVote')}>
        <IconButton onClick={() => void handleVote(voted ? null : type)}>
          <Icon />
        </IconButton>
      </Tooltip>
      <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
        {count}
      </Typography>
    </Box>
  )
}
