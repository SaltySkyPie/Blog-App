import { ArticleState, useGetUserArticlesLazyQuery } from '@app/graphql/types'
import { Box, Button } from '@mui/material'
import { FormikErrors } from 'formik'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { InjectedComponent } from './EditorEngine'
import { useEditorEngineFormik } from './useEditorEngineFormik'

export default function useInjectedComponentsAction({
  formik,
  handleSubmit,
  state,
}: {
  formik: ReturnType<typeof useEditorEngineFormik>
  handleSubmit: (state?: ArticleState) => Promise<void>
  state?: ArticleState
}) {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [, { refetch }] = useGetUserArticlesLazyQuery()

  const formikErrors: FormikErrors<typeof formik.values> = formik.errors

  const actions: InjectedComponent = useMemo(() => {
    const submit = async (sState?: ArticleState) => {
      await handleSubmit(sState)
      void refetch()
    }
    return {
      title: t('actions'),
      component: (
        <Box>
          {Object.values(formikErrors).map((error) => (
            <Box key={error} sx={{ color: 'red', my: 0.5 }}>
              {error}
            </Box>
          ))}
          {!!state && (
            <Button
              variant="contained"
              onClick={() => {
                void submit(state)
              }}
              sx={{
                m: 0.5,
              }}
              disabled={formik.isSubmitting || !formik.isValid}
            >
              {t('save')} ({t(state.toLocaleLowerCase())})
            </Button>
          )}
          <Button
            variant="contained"
            onClick={() => {
              void submit(ArticleState.Draft)
            }}
            sx={{
              m: 0.5,
            }}
            disabled={formik.isSubmitting || !formik.isValid}
          >
            {t('saveAsDraft')}
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              void submit(ArticleState.Published)
            }}
            sx={{
              m: 0.5,
            }}
            disabled={formik.isSubmitting || !formik.isValid}
          >
            {t('publish')}
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
  }, [t, formikErrors, formik.isSubmitting, formik.isValid, handleSubmit, refetch, navigate, state])

  return actions
}
