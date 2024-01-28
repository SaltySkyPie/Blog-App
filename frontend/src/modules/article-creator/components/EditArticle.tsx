import { ArticleState, useGetUserArticleLazyQuery, useUpdateArticleMutation } from '@app/graphql/types'
import { LinearProgress } from '@mui/material'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import EditorEngine from './EditorEngine'
import { useEditorEngineFormik } from './useEditorEngineFormik'
import useInjectedComponentsAction from './useInjectedComponentsAction'

// Define the EditArticle component
export default function EditArticle() {
  // Hooks for navigation and translation
  const navigate = useNavigate()
  const { t } = useTranslation()

  // GraphQL mutations and queries
  const [updateArticle] = useUpdateArticleMutation()
  const [getArticle, { data, loading, error }] = useGetUserArticleLazyQuery()

  // Extract article ID from URL parameters
  const { id } = useParams<{ id: string }>()

  // Fetch article data when component mounts or ID changes
  useEffect(() => {
    if (id) void getArticle({ variables: { id } })
  }, [getArticle, id])

  // Extract the article data from the GraphQL query response
  const article = data?.userArticle

  // Initialize formik for form handling
  const formik = useEditorEngineFormik()

  // Update formik values when article data is loaded
  useEffect(() => {
    if (article) {
      void formik.setValues({
        title: article.title,
        perex: article.perex,
        content: article.content,
        imageUrl: article.imageUrl ?? '',
      })
    }
    // disabled due to infinite loop when formik is updated
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [article])

  // Handle form submission
  const handleSubmit = async (state?: ArticleState) => {
    const { title, content, imageUrl, perex } = formik.values

    if (!id) return

    try {
      // Update article using GraphQL mutation
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

      // Handle potential errors
      if (errors) {
        const errorMessages = errors.map((error) => error.message).join(', ')
        toast.error(t('errorSavingArticle') + ': ' + errorMessages)
        return
      }
    } catch (error) {
      // Handle unexpected errors
      if (error instanceof Error) toast.error(t('errorSavingArticle') + ': ' + error.message)
      else toast.error(t('errorSavingArticle'))
      return
    }

    // Show success message and navigate to the list of articles
    toast.success(t('articleSaved'))
    navigate('/my-articles')
  }

  // Custom hook for additional actions in the editor
  const actions = useInjectedComponentsAction({ formik, handleSubmit, state: article?.state})

  // Show loading indicator while data is being fetched
  if (loading) return <LinearProgress />

  // Handle loading error or missing article ID
  if (error || !id) return <></>

  // Render the editor engine with injected components
  return <EditorEngine injectedComponents={[actions]} formik={formik} title={t('editArticle')} />
}
