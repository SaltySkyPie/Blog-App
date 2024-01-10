import { ArticleState } from '@app/graphql/types'
import Edit from '@mui/icons-material/Edit'
import Save from '@mui/icons-material/Save'
import { GridActionsCellItem, GridColDef } from '@mui/x-data-grid'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const useArticleManagementColumns = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const columns: GridColDef[] = useMemo(() => {
    return [
      { field: 'id', headerName: 'ID', flex: 1, type: 'string' },
      { field: 'title', headerName: t('title'), flex: 1, type: 'string' },
      {
        field: 'createdAt',
        headerName: t('createdAt'),
        flex: 1,
        type: 'dateTime',
        valueGetter: (params) => {
          return new Date(params.value as string)
        },
      },
      {
        field: 'updatedAt',
        headerName: t('updatedAt'),
        flex: 1,
        type: 'dateTime',
        valueGetter: (params) => {
          return new Date(params.value as string)
        },
      },
      {
        field: 'state',
        headerName: t('state'),
        flex: 1,
        type: 'singleSelect',
        editable: true,
        valueOptions: Object.values(ArticleState).map((state) => ({
          value: state,
          label: t(state.toLocaleLowerCase()),
        })),
      },
      {
        field: 'actions',
        headerName: t('actions'),
        flex: 1,
        type: 'actions',
        getActions: (params) => {
          return [
            <GridActionsCellItem icon={<Save />} label={t('save')}/>,
            <GridActionsCellItem
              icon={<Edit />}
              label={t('edit')}
              onClick={() => {
                navigate(`/article/${params.id}/edit`)
              }}
            />,
          ]
        },
      },
    ]
  }, [navigate, t])

  return { columns }
}

export default useArticleManagementColumns
