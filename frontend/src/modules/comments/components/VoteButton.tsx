import { GetArticleCommentsQuery } from '@app/graphql/types'
import { Box } from '@mui/material'
import VoteButtonInstance from './VoteButtonInstance'

// Define the VoteButton component
export default function VoteButton({ comment }: { comment: GetArticleCommentsQuery['articleComments'][0] }) {
  // Render the vote buttons
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
      {comment.voteTypeCounts.map((vtc) => (
        <VoteButtonInstance key={vtc.type} voteTypeCount={vtc} commentId={comment.id} />
      ))}
    </Box>
  )
}
