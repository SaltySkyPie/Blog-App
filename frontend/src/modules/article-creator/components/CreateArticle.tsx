import { ArticleState, useCreateArticleMutation } from '@app/graphql/types'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import EditorEngine from './EditorEngine'
import { useEditorEngineFormik } from './useEditorEngineFormik'
import useInjectedComponentsAction from './useInjectedComponentsAction'

export default function CreateArticle() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [createArticle] = useCreateArticleMutation()
  const formik = useEditorEngineFormik()

  const handleSubmit = async (state?: ArticleState) => {
    const { title, content, imageUrl, perex } = formik.values

    try {
      const { errors } = await createArticle({
        variables: {
          input: {
            title,
            content,
            imageUrl,
            state: state ?? ArticleState.Draft,
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
    navigate('/my-articles')
  }

  const actions = useInjectedComponentsAction({ formik, handleSubmit })

  return <EditorEngine injectedComponents={[actions]} formik={formik} title={t('createArticle')} />
}
