import { useGetArticleLazyQuery } from '@app/graphql/types'
import { useProfile } from '@app/modules/auth/utils/useProfile'
import ArticleContainer from '@app/modules/common/components/Layout/Article/ArticleContainer'
import ArticleItemContainer from '@app/modules/common/components/Layout/Article/ArticleItemContainer'
import NotFoundPage from '@app/modules/common/components/Misc/NotFound'
import Share from '@app/modules/common/components/Misc/Share'
import { useTimeAgo } from '@app/modules/common/utils/useTimeAgo'
import { Box, Button, Divider, LinearProgress } from '@mui/material'
import MDEditor from '@uiw/react-md-editor'
import { t } from 'i18next'
import { useCallback, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import CommentList from '../../comments/components/CommentList'
import WrittenBy from './WrittenBy'

export default function Article() {
  const { id } = useParams<{ id: string }>()
  const [getArticle, { data, loading, error }] = useGetArticleLazyQuery()

  useEffect(() => {
    if (id) void getArticle({ variables: { id } })
  }, [getArticle, id])

  const userId = useProfile()?.id

  const navigate = useNavigate()

  const date = useTimeAgo(data?.article.createdAt)

  const navigateToEdit = useCallback(() => {
    if (id) navigate(`/article/${id}/edit`)
  }, [id, navigate])

  if (loading) return <LinearProgress />
  if (error || !id) return <NotFoundPage />

  const article = data?.article

  const authorName = `${article?.user.firstName} ${article?.user.lastName}`
  const authorWithMiddleName = `${article?.user.firstName}${
    article?.user.middleName ? ` ${article.user.middleName} ` : ' '
  }${article?.user.lastName}`

  return (
    <ArticleContainer
      title={article?.title || t('article')}
      subContentSpacing={1}
      spacing={2}
      mainContent={
        <>
          <ArticleItemContainer>
            <Box
              sx={{
                '& img': {
                  width: '100%',
                  maxHeight: '500px',
                },
                'textAlign': 'center',
              }}
            >
              <img src={article?.imageUrl || ''} alt={article?.title || ''} />
            </Box>
            <Divider sx={{ my: 2 }} />
          </ArticleItemContainer>
          <ArticleItemContainer data-color-mode="light">
            <MDEditor.Markdown source={article?.content} />
          </ArticleItemContainer>
        </>
      }
      sideContent={
        <>
          <ArticleItemContainer>
            <WrittenBy authorName={authorName} authorWithMiddleName={authorWithMiddleName} date={date} />
            <Divider sx={{ my: 2 }} />
            <Share url={window.location.href} />
            {userId === article?.user.id && (
              <>
                <Divider sx={{ my: 2 }} />
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Button variant="contained" color="primary" onClick={navigateToEdit} sx={{ m: 0.5 }}>
                    {t('edit')}
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                      navigate('/my-articles')
                    }}
                    sx={{ m: 0.5 }}
                  >
                    {t('articleManagement')}
                  </Button>
                </Box>
              </>
            )}
            <Divider sx={{ my: 2 }} />
            <CommentList articleId={id} />
          </ArticleItemContainer>
        </>
      }
    />
  )
}
