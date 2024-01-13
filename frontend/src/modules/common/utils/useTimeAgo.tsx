import { Box, Tooltip } from '@mui/material'
import { useMemo } from 'react'
import TimeAgo from 'timeago-react'
import * as timeago from 'timeago.js'
import { getLanguage, getLanguageResource } from './i18next'

export const useTimeAgo = (date?: string | Date) => {
  const dateObject = useMemo(() => {
    if (!date) {
      return new Date()
    }
    if (typeof date === 'string') {
      return new Date(date)
    }

    return date
  }, [date])

  const languageResource = getLanguageResource()

  const language = getLanguage()

  timeago.register(language, languageResource.timeAgo)

  const timeAgo = useMemo(() => {
    return (
      <Tooltip title={dateObject.toLocaleString()}>
        <Box>
          <TimeAgo datetime={dateObject} locale={language} />
        </Box>
      </Tooltip>
    )
  }, [dateObject, language])

  return timeAgo
}
