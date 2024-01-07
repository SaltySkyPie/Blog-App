import { useFormik } from 'formik'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'
import { EditedArticle } from './EditorEngine'

export const useEditorEngineFormik = (article?: EditedArticle) => {
  const { t } = useTranslation()

  const validationSchema: Yup.Schema<EditedArticle> = useMemo(() => {
    return Yup.object({
      title: Yup.string()
        .required(`${t('title')} ${t('isRequired')}`)
        .min(
          3,
          t('minLength', {
            what: t('title'),
            length: 3,
          })
        )
        .max(
          255,
          t('maxLength', {
            what: t('title'),
            length: 255,
          })
        ),
      perex: Yup.string()
        .required(`${t('perex')} ${t('isRequired')}`)
        .min(5, t('minLength', { what: t('perex'), length: 5 }))
        .max(1000, t('maxLength', { what: t('perex'), length: 1000 })),
      content: Yup.string()
        .required(`${t('content')} ${t('isRequired')}`)
        .min(25, t('minLength', { what: t('content'), length: 25 })),
      imageUrl: Yup.string()
        .url(`${t('imageUrl')} ${t('isInvalid')}`)
        .required(`${t('imageUrl')} ${t('isRequired')}`),
    })
  }, [t])

  const formik = useFormik<EditedArticle>({
    initialValues: {
      title: article?.title || '',
      perex: article?.perex || '',
      content: article?.content || '',
      imageUrl: article?.imageUrl || '',
    },
    validationSchema,
    onSubmit: () => {},
    validateOnChange: true,
    validateOnMount: true,
  })

  return formik
}
