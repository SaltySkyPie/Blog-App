import { useCreateCommentMutation, useGetArticleCommentsQuery } from '@app/graphql/types'
import RefreshIcon from '@mui/icons-material/Refresh'
import { Box, Button, CircularProgress, IconButton, Typography } from '@mui/material'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import Comment from './Comment'
import CommentForm from './CommentForm'

export default function CommentList({ articleId }: { articleId: string }) {
  const { t } = useTranslation()

  const { data, loading, error, fetchMore, refetch } = useGetArticleCommentsQuery({
    variables: { articleId, offset: 0, limit: 10 },
  })

  const [createComment] = useCreateCommentMutation({})

  const loadingFirstTime = useMemo(() => {
    return loading && !data
  }, [data, loading])

  const len = useMemo(() => {
    if (!data) return 0
    return data.articleComments.length
  }, [data])

  const comments = useMemo(() => {
    if (!data) return []
    return data.articleComments.slice().sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const loadMore = () => {
    void fetchMore({
      variables: {
        offset: len,
      },
    })
  }

  const handleCreateComment = async (values: { content: string }) => {
    await createComment({
      variables: {
        input: {
          articleId,
          content: values.content,
        },
      },
      updateQueries: {
        getArticleComments: (prev, { mutationResult }) => {
          if (!mutationResult.data) return prev

          const newComment = mutationResult.data.createComment

          return {
            articleComments: [...prev.articleComments, newComment],
          }
        },
      },
    })
  }

  if (loadingFirstTime) return <></>
  if (error) return <></>

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" display={'inline'}>
          {t('comments')}
        </Typography>
        <IconButton
          size="large"
          onClick={() => {
            void refetch()
          }}
        >
          <RefreshIcon />
        </IconButton>
      </Box>
      <Box
        sx={{
          mt: 2,
        }}
      >
        <CommentForm onSubmit={handleCreateComment} />
        {comments.map((comment, index) => (
          <Comment key={index + comment.id} comment={comment} />
        ))}

        <Button
          variant="text"
          color="primary"
          disabled={loading}
          sx={{
            my: 2,
          }}
          onClick={() => {
            loadMore()
          }}
        >
          {loading ? <CircularProgress /> : t('loadMore')}
        </Button>
      </Box>
    </>
  )
}
