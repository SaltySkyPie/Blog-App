import {
  ArticleState,
  useGetUserArticleLazyQuery,
  useGetUserArticlesLazyQuery,
  useUpdateArticleMutation,
} from '@app/graphql/types'
import { Box, Button, LinearProgress } from '@mui/material'
import { FormikErrors } from 'formik'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import EditorEngine, { InjectedComponent } from './EditorEngine'
import { useEditorEngineFormik } from './useEditorEngineFormik'

export default function EditArticle() {
  const navigate = useNavigate()

  const { t } = useTranslation()

  const [updateArticle] = useUpdateArticleMutation()

  const [, { refetch }] = useGetUserArticlesLazyQuery()

  const { id } = useParams<{ id: string }>()
  const [getArticle, { data, loading, error }] = useGetUserArticleLazyQuery()

  useEffect(() => {
    if (id) void getArticle({ variables: { id } })
  }, [getArticle, id])

  const article = data?.userArticle

  const formik = useEditorEngineFormik()

  useEffect(() => {
    if (article) {
      void formik.setValues({
        title: article.title,
        perex: article.perex,
        content: article.content,
        imageUrl: article.imageUrl ?? '',
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [article])

  if (loading) return <LinearProgress />
  if (error || !id) return <></>

  const handleSubmit = async (state?: ArticleState) => {
    const { title, content, imageUrl, perex } = formik.values

    try {
      const { errors } = await updateArticle({
        variables: {
          input: {
            id,
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
          onClick={() => void handleSubmit()}
          sx={{
            m: 0.5,
          }}
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {t('save')}
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            if (confirm(t('confirmBack'))) {
              void refetch()
              navigate(-1)
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

  return <EditorEngine injectedComponents={[actions]} formik={formik} title={t('editArticle')} />
}
