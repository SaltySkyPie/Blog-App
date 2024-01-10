import { useGetUserArticlesQuery, useUpdateArticleMutation } from '@app/graphql/types'
import { Box, Button, Container, LinearProgress, Typography } from '@mui/material'
import { DataGrid, GridValidRowModel } from '@mui/x-data-grid'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import useArticleManagementColumns from './GridColumns'

const ArticleList = () => {
  const { t } = useTranslation()
  const { data, loading} = useGetUserArticlesQuery()
  const { columns } = useArticleManagementColumns()
  const navigate = useNavigate()
  const [updateArticle] = useUpdateArticleMutation()

  if (loading) return <LinearProgress />

  const articles = data?.userArticles || []

  return (
    <>
      <Container>
        <Box sx={{ my: 5, textAlign: 'center' }}>
          <Typography variant="h3" gutterBottom>
            {t('myArticleList')}
          </Typography>
        </Box>
        <Box sx={{ my: 2, textAlign: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              navigate('/article/create')
            }}
          >
            {t('createArticle')}
          </Button>
        </Box>
        <DataGrid
          columns={columns}
          rows={articles}
          rowSelection={false}
          processRowUpdate={async (newRow: GridValidRowModel, oldRow: GridValidRowModel) => {
            const { id, title, state } = newRow
            if (!id || !title || !state) return oldRow
            try {
              const {data: newArticle, errors } = await updateArticle({
                variables: {
                  input: {
                    id,
                    title,
                    state,
                  },
                },
              })
              newRow = {
                ...oldRow,
                ...newRow,
                ...newArticle?.updateArticle,
              }
              if (errors) {
                const errorMessages = errors.map((error) => error.message).join(', ')
                toast.error(t('errorSavingArticle') + ': ' + errorMessages)
                return oldRow
              }
            } catch (error) {
              if (error && typeof error === 'object' && 'message' in error && typeof error.message === 'string')
                toast.error(t('errorSavingArticle') + ': ' + error.message)
              else toast.error(t('errorSavingArticle'))
              return oldRow
            }
            toast.success(t('articleSaved'))
            return newRow
          }}
        />
      </Container>
    </>
  )
}

export default ArticleList
