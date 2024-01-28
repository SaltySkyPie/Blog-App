import { Typography } from '@mui/material'

export default function ArticlePerex({ perex }: { perex: string }) {
  return (
    <Typography
      variant="subtitle1"
      color="text.secondary"
      sx={{
        my: 1,
        height: {
          xs: 60,
          md: 80,
        },
        overflow: 'hidden',
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: {
          xs: 3,
          md: 4,
        },
      }}
    >
      {perex}
    </Typography>
  )
}
