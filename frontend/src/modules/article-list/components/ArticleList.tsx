import { useGetArticlesQuery } from '@app/graphql/types'
import { Box, Button, CircularProgress, Container, Divider, Grid, LinearProgress, Typography } from '@mui/material'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import ArticleListItem from './ArticleListItem'

const ArticleList = () => {
  const { t } = useTranslation()
  const { data, loading, fetchMore } = useGetArticlesQuery({
    variables: { offset: 0, limit: 5 },
    notifyOnNetworkStatusChange: true,
  })

  // Check if it's the first loading
  const isLoadingFirstTime = useMemo(() => loading && !data, [data, loading])

  // Compute the length of articles
  const articlesLength = useMemo(() => data?.articles.length || 0, [data])

  // Memoize articles for performance
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const articles = useMemo(() => data?.articles || [], [articlesLength])

  // Render the articles list
  const RecentArticles = useMemo(() => {
    return (
      <Grid container spacing={4}>
        {articles.map((article, index) => (
          <ArticleListItem key={index} article={article} />
        ))}
      </Grid>
    )
  }, [articles])

  // Render the load more button
  const LoadMoreButton = useMemo(() => {
    // Load more articles
    const handleLoadMore = () => {
      void fetchMore({ variables: { offset: articlesLength } })
    }

    return (
      <Grid item xs={12} sx={{ textAlign: 'center' }}>
        <Button variant="text" color="primary" disabled={loading} sx={{ my: 2 }} onClick={handleLoadMore}>
          {loading ? <CircularProgress /> : t('loadMore')}
        </Button>
      </Grid>
    )
  }, [articlesLength, fetchMore, loading, t])

  if (isLoadingFirstTime) return <LinearProgress />

  return (
    <Container>
      <Box sx={{ my: 5, textAlign: 'center' }}>
        <Typography variant="h3" gutterBottom>
          {t('articleList')}
        </Typography>
      </Box>
      {RecentArticles}
      <Divider />
      {LoadMoreButton}
    </Container>
  )
}

export default ArticleList
