import { GetArticlesQuery } from '@app/graphql/types'
import { Avatar } from '@app/modules/common/components/Misc/Avatar'
import { useTimeAgo } from '@app/modules/common/utils/useTimeAgo'
import { Box, CardActions, CardContent, Grid, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ArticleCard } from './ArticleCard'
import ArticleImage from './ArticleImage'
import ArticlePerex from './ArticlePerex'

export default function ArticleListItem({ article }: { article: GetArticlesQuery['articles'][0] }) {
  const authorName = `${article.user.firstName} ${article.user.lastName}`

  const date = useTimeAgo(article.createdAt)

  const { t } = useTranslation()
  return (
    <Grid item xs={12}>
      <ArticleCard>
        <ArticleImage url={article.imageUrl} />
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography variant="h4">{article.title}</Typography>
            <ArticlePerex perex={article.perex} />
          </CardContent>
          <CardActions sx={{ display: 'flex', alignItems: 'center', p: 1, justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
              <Avatar name={authorName} />
              <Box sx={{ ml: 1 }}>
                <Typography variant="subtitle2">{authorName}</Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  {date}
                </Typography>
              </Box>
            </Box>
            <Link to={`/article/${article.id}`}>
              <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
                <Typography variant="body1">{t('readMore')}</Typography>
              </Box>
            </Link>
          </CardActions>
        </Box>
      </ArticleCard>
    </Grid>
  )
}
