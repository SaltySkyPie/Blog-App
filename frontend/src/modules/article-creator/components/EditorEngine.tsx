import ArticleContainer from '@app/modules/common/components/Layout/Article/ArticleContainer'
import ArticleItemContainer from '@app/modules/common/components/Layout/Article/ArticleItemContainer'
import { estimateReadingTime } from '@app/modules/common/components/Misc/reading-time'
import { Box, Divider, TextField, Typography } from '@mui/material'
import MDEditor, { Statistics } from '@uiw/react-md-editor'
import { useFormik } from 'formik'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import rehypeSanitize from 'rehype-sanitize'

export interface EditedArticle {
  title: string
  perex: string
  content: string
  imageUrl: string
  [key: string]: string
}

export interface OnSubmitFunctionArgs {
  article: EditedArticle
}

export interface InjectedComponent {
  component: React.ReactNode
  title: string
}

export type EditorEngineFormik = ReturnType<typeof useFormik<EditedArticle>>

export interface EditorEngineProps {
  title?: string
  injectedComponents?: InjectedComponent[]
  formik: EditorEngineFormik
}

const EditorEngine: React.FC<EditorEngineProps> = ({ title, injectedComponents, formik }) => {
  const [statistics, setStatistics] = useState<Statistics | null>(null)

  const { t } = useTranslation()

  return (
    <ArticleContainer
      title={title}
      subContentSpacing={1}
      mainContent={
        <>
          {Object.keys(formik.values).map((key) => {
            if (key === 'content') return null
            return (
              <ArticleItemContainer key={key}>
                <TextField
                  fullWidth
                  id={key}
                  name={key}
                  label={t(key)}
                  variant="outlined"
                  margin="normal"
                  value={formik.values[key]}
                  onChange={formik.handleChange}
                />
              </ArticleItemContainer>
            )
          })}
          <ArticleItemContainer data-color-mode="light">
            <MDEditor
              height={250}
              autoFocus
              value={formik.values.content}
              onChange={(value) => {
                void formik.setFieldValue('content', value || '')
              }}
              onStatistics={(statistics) => {
                setStatistics(statistics)
              }}
              previewOptions={{
                rehypePlugins: [[rehypeSanitize, { clobberPrefix: 'user-content-' }]],
              }}
            />
          </ArticleItemContainer>
          <ArticleItemContainer>
            <Divider sx={{ my: 2 }} />
          </ArticleItemContainer>
          <ArticleItemContainer data-color-mode="light">
            <MDEditor.Markdown source={formik.values.content} />
          </ArticleItemContainer>
        </>
      }
      sideContent={
        <>
          <ArticleItemContainer>
            <Box sx={{ my: 4 }}>
              <Typography variant="h4">{t('statistics')}</Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body1">
                {t('length')}: {statistics?.length}
              </Typography>
              <Typography variant="body1">
                {t('lineCount')}: {statistics?.lineCount}
              </Typography>
              <Typography variant="body1">
                {' '}
                {t('words')}: {statistics?.text.split(' ').length}
              </Typography>
              <Typography variant="body1">
                {t('readingTime')}: {statistics?.text ? estimateReadingTime(statistics.text).toFixed(2) + ' min' : ''}
              </Typography>
            </Box>
            {injectedComponents?.map((injc, index) => (
              <Box key={index + 'ijc'} sx={{ my: 4 }}>
                <Typography variant="h4">{injc.title}</Typography>
                <Divider sx={{ my: 1 }} />
                {injc.component}
              </Box>
            ))}
          </ArticleItemContainer>
        </>
      }
    />
  )
}

export default EditorEngine
