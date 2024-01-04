import { Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

const NotFoundPage = () => {
  const { t } = useTranslation()
  return (
    <>
      <Typography variant="h1">404</Typography>
      <Typography variant="h4" color="textSecondary" style={{ margin: '20px 0' }}>
        {t('common.notFound')}
      </Typography>
    </>
  )
}

export default NotFoundPage
