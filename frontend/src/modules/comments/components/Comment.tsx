import { GetArticleCommentsQuery } from '@app/graphql/types'
import { Avatar } from '@app/modules/common/components/Misc/Avatar'
import { useTimeAgo } from '@app/modules/common/utils/useTimeAgo'
import { Box, Typography } from '@mui/material'
import { useMemo } from 'react'
import VoteButton from './VoteButton'

const Comment = ({ comment }: { comment: GetArticleCommentsQuery['articleComments'][0] }) => {
  const authorName = useMemo(
    () => `${comment.user.firstName} ${comment.user.lastName}`,
    [comment.user.firstName, comment.user.lastName]
  )
  const date = useTimeAgo(comment.createdAt)

  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2, width: '100%' }}>
      <Avatar name={authorName} sx={{ mr: 2, mt: 1 }} />
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
      
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle1" fontWeight="bold">
            {authorName}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" ml={1}>
            {date}
          </Typography>
        </Box>
        <Box>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              wordBreak: 'break-word',
            }}
          >
            {comment.content}
          </Typography>

          <VoteButton comment={comment} />
        </Box>
      </Box>
    </Box>
  )
}

export default Comment
