import { useGetArticlesQuery } from '@app/graphql/types'
import { Box, Button, CircularProgress, Container, Divider, Grid, LinearProgress, Typography } from '@mui/material'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import ArticleListItem from './ArticleListItem'

const ArticleList = () => {
  const { t } = useTranslation()
  const { data, loading, fetchMore } = useGetArticlesQuery({
    variables: {
      offset: 0,
      limit: 5
    },
    notifyOnNetworkStatusChange: true,
  })

  const loadingFirstTime = useMemo(() => {
    return loading && !data
  }, [data, loading])

  const len = useMemo(() => {
    if (!data) return 0
    return data.articles.length
  }, [data])

  const articles = useMemo(() => {
    if (!data) return []
    return data.articles
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [len])

  const loadMore = () => {
    void fetchMore({
      variables: {
        offset: len,
      },
    })
  }

  if (loadingFirstTime) return <LinearProgress />

  return (
    <>
      <Container>
        <Box sx={{ my: 5, textAlign: 'center' }}>
          <Typography variant="h3" gutterBottom>
            {t('articleList')}
          </Typography>
        </Box>
        <Grid container spacing={4}>
          {articles.map((article, index) => (
            <ArticleListItem article={article} key={index} />
          ))}
          <Divider />
          <Grid item xs={12} sx={{ textAlign: 'center' }}>
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
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default ArticleList
