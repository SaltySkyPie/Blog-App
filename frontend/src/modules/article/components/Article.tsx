import { useGetArticleLazyQuery } from '@app/graphql/types'
import ArticleContainer from '@app/modules/common/components/Layout/Article/ArticleContainer'
import ArticleItemContainer from '@app/modules/common/components/Layout/Article/ArticleItemContainer'
import { Avatar } from '@app/modules/common/components/Misc/Avatar'
import { StyledLink } from '@app/modules/common/components/Misc/Link.styled'
import NotFoundPage from '@app/modules/common/components/Misc/NotFound'
import Share from '@app/modules/common/components/Misc/Share'
import { Box, Divider, LinearProgress, Typography } from '@mui/material'
import MDEditor from '@uiw/react-md-editor'
import { t } from 'i18next'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

export default function Article() {
  const { id } = useParams<{ id: string }>()
  const [getArticle, { data, loading, error }] = useGetArticleLazyQuery()

  useEffect(() => {
    if (id) void getArticle({ variables: { id } })
  }, [getArticle, id])

  if (loading) return <LinearProgress />
  if (error || !id) return <NotFoundPage />

  const article = data?.article

  const date = new Date(article?.createdAt || '')
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
            <StyledLink to={`/profile/${article?.user.id}`}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="h4">{t('writtenBy')}</Typography>
                <Box sx={{ my: 2 }}>
                  <Avatar
                    name={authorName}
                    sx={{
                      width: '100px',
                      height: '100px',
                      fontSize: '50px',
                    }}
                  />
                </Box>
                <Typography variant="h5">{authorWithMiddleName}</Typography>
                <Typography variant="caption">{date.toLocaleDateString()}</Typography>
              </Box>
            </StyledLink>
            <Divider sx={{ my: 2 }} />
            <Share url={window.location.href} />
          </ArticleItemContainer>
        </>
      }
    />
  )
}
