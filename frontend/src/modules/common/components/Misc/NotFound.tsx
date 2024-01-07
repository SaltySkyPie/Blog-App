import { Container, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

const NotFoundPage = () => {
  const { t } = useTranslation()
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        mt: 5,
      }}
    >
      <Typography variant="h1">404</Typography>
      <Typography variant="h4" color="textSecondary" style={{ margin: '20px 0' }}>
        {t('notFound')}
      </Typography>
    </Container>
  )
}

export default NotFoundPage
