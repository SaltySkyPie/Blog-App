import { ArticleState, useCreateArticleMutation, useGetUserArticlesLazyQuery } from '@app/graphql/types'
import { Box, Button } from '@mui/material'
import { FormikErrors } from 'formik'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import EditorEngine, { InjectedComponent } from './EditorEngine'
import { useEditorEngineFormik } from './useEditorEngineFormik'

export default function CreateArticle() {
  const navigate = useNavigate()

  const { t } = useTranslation()

  const [createArticle] = useCreateArticleMutation()

    const [, { refetch }] = useGetUserArticlesLazyQuery()

  const formik = useEditorEngineFormik()

  const handleSubmit = async (state: ArticleState) => {
    const { title, content, imageUrl, perex } = formik.values

    try {
      const { errors } = await createArticle({
        variables: {
          input: {
            title,
            content,
            imageUrl,
            state,
            perex,
          },
        },
      })

      if (errors) {
        const errorMessages = errors.map((error) => error.message).join(', ')
        toast.error(t('errorSavingArticle') + ': ' + errorMessages)
        return
      }
    } catch (error) {
      if (error && typeof error === 'object' && 'message' in error && typeof error.message === 'string')
        toast.error(t('errorSavingArticle') + ': ' + error.message)
      else toast.error(t('errorSavingArticle'))
      return
    }

    toast.success(t('articleSaved'))
    void refetch()
    navigate('/my-articles')
  }

  const formikErrors: FormikErrors<typeof formik.values> = formik.errors

  const actions: InjectedComponent = {
    title: t('actions'),
    component: (
      <Box>
        {Object.values(formikErrors).map((error) => (
          <Box key={error} sx={{ color: 'red', my: 0.5 }}>
            {error}
          </Box>
        ))}
        <Button
          variant="contained"
          onClick={() => void handleSubmit(ArticleState.Published)}
          sx={{
            m: 0.5,
          }}
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {t('publish')}
        </Button>
        <Button
          variant="outlined"
          onClick={() => void handleSubmit(ArticleState.Draft)}
          sx={{
            m: 0.5,
          }}
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {t('saveAsDraft')}
        </Button>

        <Button
          variant="outlined"
          onClick={() => {
            if (confirm(t('confirmBack'))) {
              void refetch()
              navigate('/my-articles')
            }
          }}
          sx={{
            m: 0.5,
          }}
        >
          {t('back')}
        </Button>
      </Box>
    ),
  }

  return <EditorEngine injectedComponents={[actions]} formik={formik} title={t('createArticle')} />
}
