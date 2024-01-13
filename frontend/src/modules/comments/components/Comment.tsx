import { GetArticleCommentsQuery, VoteType, useVoteArticleCommentMutation } from '@app/graphql/types'
import { useProfile } from '@app/modules/auth/utils/useProfile'
import { Avatar } from '@app/modules/common/components/Misc/Avatar'
import { Box, IconButton, Tooltip, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { VoteTypeIcons } from './VoteTypeIcons'
import { useTimeAgo } from '@app/modules/common/utils/useTimeAgo'

const Comment = ({ comment }: { comment: GetArticleCommentsQuery['articleComments'][0] }) => {
  const { t } = useTranslation()

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

  const authorName = `${comment.user.firstName} ${comment.user.lastName}`

  const date = useTimeAgo(comment.createdAt)

  const id = comment.id

  const user = useProfile()

  const handleVote = async (type: VoteType | null) => {
    if (!user) return

    await vote({
      variables: {
        input: {
          commentId: id,
          type,
        },
      },
    })

    return
}

  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
      <Avatar name={authorName} sx={{ mr: 2, mt: 1 }} />
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle1" fontWeight="bold">
            {authorName}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" ml={1}>
            {date}
          </Typography>
        </Box>
        <Box>
          <Typography variant="body1" color="text.secondary" sx={{
            wordBreak: 'break-all'
          }}>
            {comment.content}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
          {comment.voteTypeCounts.map((vtc) => {
            const key = vtc.type

            const iconObj = (key in VoteTypeIcons ? VoteTypeIcons[key] : null) ?? VoteTypeIcons.default

            const Icon = vtc.voted ? iconObj.active : iconObj.inactive

            return (
              <Box key={key} sx={{ display: 'flex', alignItems: 'center' }}>
                <Tooltip
                  title={user ? t('vote' + key[0].toUpperCase() + key.slice(1).toLocaleLowerCase()) : t('needLoginVote')}
                >
                  <Box>
                    <IconButton
                      onClick={() => {
                        void handleVote(vtc.voted ? null : key)
                      }}
                    >
                      <Icon />
                    </IconButton>
                  </Box>
                </Tooltip>
                <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                  {vtc.count}
                </Typography>
              </Box>
            )
          })}
        </Box>
      </Box>
    </Box>
  )
}

export default Comment
