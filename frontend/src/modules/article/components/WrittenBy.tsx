import { Avatar } from '@app/modules/common/components/Misc/Avatar'
import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

export default function WrittenBy({
  authorName,
  authorWithMiddleName,
  date,
}: {
  authorName: string
  authorWithMiddleName: string
  date: JSX.Element | React.ReactNode
}) {
  const { t } = useTranslation()
  return (
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
      <Typography variant="caption">{date}</Typography>
    </Box>
  )
}
