import { GetArticlesQuery } from '@app/graphql/types'
import { Avatar } from '@app/modules/common/components/Misc/Avatar'
import { useTimeAgo } from '@app/modules/common/utils/useTimeAgo'
import { Box, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export default function ArticleListItem({ article }: { article: GetArticlesQuery['articles'][0] }) {
  const authorName = `${article.user.firstName} ${article.user.lastName}`

  const date = useTimeAgo(article.createdAt)

  const { t } = useTranslation()
  return (
    <Grid item xs={12}>
      <Card
        sx={{
          display: {
            xs: 'block',
            md: 'flex',
          },
        }}
        elevation={3}
      >
        <CardMedia
          component="img"
          sx={{
            width: {
              xs: '100%',
              md: 300,
            },
            height: {
              xs: 200,
              md: 'auto',
            },
          }}
          image={!article.imageUrl || !article.imageUrl.length ? '/placeholder.webp' : article.imageUrl}
          alt={article.title}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography variant="h4">{article.title}</Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{
                my: 1,
                overflow: 'hidden',
                textOverflow: 'revert',
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 3,
                height: {
                  xs: 60,
                  md: 80,
                },
              }}
            >
              {article.perex}
            </Typography>
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
                <Typography variant="h6">{t('readMore')}</Typography>
              </Box>
            </Link>
          </CardActions>
        </Box>
      </Card>
    </Grid>
  )
}
