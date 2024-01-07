import { useGetArticlesQuery } from '@app/graphql/types'
import { Box, Container, Grid, LinearProgress, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import ArticleListItem from './ArticleListItem'

const ArticleList = () => {
  const { t } = useTranslation()
  const { data, loading } = useGetArticlesQuery()

  if (loading) return <LinearProgress />

  const articles = data?.articles || []

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
        </Grid>
      </Container>
    </>
  )
}

export default ArticleList
