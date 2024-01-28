import { CardMedia } from '@mui/material'

export default function Image({ url }: { url?: string | null | undefined }) {
  return (
    <CardMedia
        component="img"
        loading="lazy"
        sx={{
            width: {
                xs: '100%',
                md: 450,
            },
            height: {
                xs: 300,
                md: 'auto',
            },
        }}
        image={!url || !url.length ? '/placeholder.webp' : url}
        alt={url || ''}
    />
  )
}
