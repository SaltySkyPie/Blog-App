import { useGetUserArticlesQuery, useUpdateArticleMutation } from '@app/graphql/types'
import { Box, Button, Container, LinearProgress, Typography } from '@mui/material'
import { DataGrid, GridValidRowModel } from '@mui/x-data-grid'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import useArticleManagementColumns from './GridColumns'

const ArticleList = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  // GraphQL hooks for fetching and updating articles
  const { data, loading } = useGetUserArticlesQuery()
  const [updateArticle] = useUpdateArticleMutation()

  // Custom hook to get columns configuration for the data grid
  const { columns } = useArticleManagementColumns()

  // Display a loading bar when data is being fetched
  if (loading) return <LinearProgress />

  // Extract articles from the fetched data, default to an empty array if no data
  const articles = data?.userArticles || []

  return (
    <>
      <Container>
        {/* Title section */}
        <Box sx={{ my: 5, textAlign: 'center' }}>
          <Typography variant="h3" gutterBottom>
            {t('myArticleList')}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {t('myArticleListDescription')}
          </Typography>
        </Box>

        {/* Button to create a new article */}
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

        {/* Data grid to display articles */}
        <DataGrid
          columns={columns}
          rows={articles}
          rowSelection={false}
          processRowUpdate={async (newRow: GridValidRowModel, oldRow: GridValidRowModel) => {
            const { id, title, state } = newRow

            // Validation check for necessary fields
            if (!id || !title || !state) return oldRow

            try {
              // Attempt to update the article
              const { data: newArticle, errors } = await updateArticle({
                variables: {
                  input: { id, title, state },
                },
              })

              // Merge the updated data with the old row data
              newRow = { ...oldRow, ...newRow, ...newArticle?.updateArticle }

              // Handle potential GraphQL errors
              if (errors) {
                const errorMessages = errors.map((error) => error.message).join(', ')
                toast.error(t('errorSavingArticle') + ': ' + errorMessages)
                return oldRow
              }
            } catch (error) {
              // Handle any other errors
              const errorMessage =
                error &&
                typeof error === 'object' &&
                'message' in error &&
                typeof error.message === 'string' &&
                error.message
                  ? error.message
                  : t('errorSavingArticle')
              toast.error(errorMessage)
              return oldRow
            }

            // Show success message
            toast.success(t('articleSaved'))
            return newRow
          }}
        />
      </Container>
    </>
  )
}

export default ArticleList
