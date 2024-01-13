import { useProfile } from '@app/modules/auth/utils/useProfile'
import { Avatar } from '@app/modules/common/components/Misc/Avatar'
import { Box, Button, TextField } from '@mui/material'
import { useFormik } from 'formik'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'

const CommentForm = ({ onSubmit }: { onSubmit: (values: { content: string }) => Promise<void> }) => {
  const { t } = useTranslation()

  const formik = useFormik({
    initialValues: {
      content: '',
    },
    validationSchema: Yup.object().shape({
      content: Yup.string().required(`${t('comment')} ${t('isRequired')}`),
    }),
    onSubmit: async (values, { resetForm, setFieldError, setSubmitting }) => {
      try {
        await onSubmit(values)
        resetForm()
        setEditMode(false)
      } catch (error) {
        console.log(error)
        setFieldError('content', t('somethingWentWrong'))
        setSubmitting(false)
      }
    },
  })

  const user = useProfile()

  const [editMode, setEditMode] = useState(false)

  if (!user) return null

  const authorName = `${user.firstName} ${user.lastName}`

  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
      {editMode && (
        <>
          <Avatar name={authorName} sx={{ mr: 2, mt: 1 }} />
          <Box>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                id="content"
                name="content"
                label={t('comment')}
                fullWidth
                multiline
                maxRows={4}
                variant="outlined"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.content}
                error={formik.touched.content && Boolean(formik.errors.content)}
                helperText={formik.touched.content && formik.errors.content}
                disabled={formik.isSubmitting}
                sx={{
                  mb: 2,
                }}
              />
              <Button type="submit" variant="contained" disabled={formik.isSubmitting} sx={{ mr: 0.5 }}>
                {
                    t('send')
                }
              </Button>
              <Button
                variant="outlined"
                disabled={formik.isSubmitting}
                sx={{ ml: 0.5 }}
                onClick={() => {
                  setEditMode(false)
                }}
              >
                {
                    t('cancel')
                }
              </Button>
            </form>
          </Box>
        </>
      )}
      {!editMode && (
        <Button
          variant="outlined"
          color="primary"
          onClick={() => {
            setEditMode(true)
          }}
        >
            {
                t('addComment')
            }
        </Button>
      )}
    </Box>
  )
}

export default CommentForm
