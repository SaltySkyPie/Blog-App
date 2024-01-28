import { ArticleState } from '@app/graphql/types'
import Edit from '@mui/icons-material/Edit'
import Save from '@mui/icons-material/Save'
import { Theme, useMediaQuery } from '@mui/material'
import { GridActionsCellItem, GridColDef } from '@mui/x-data-grid'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const useArticleManagementColumns = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  // Media query for responsive design
  const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))

  const columns: GridColDef[] = useMemo(() => {
    // Base column configuration
    const baseColumns: GridColDef[] = [
      { field: 'id', headerName: 'ID', flex: isSmallScreen ? 0 : 1, type: 'string' },
      { field: 'title', headerName: t('title'), flex: 1, type: 'string' },
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
    ]

    // Additional columns for larger screens
    const largeScreenColumns: GridColDef[] = [
      {
        field: 'createdAt',
        headerName: t('createdAt'),
        flex: 1,
        type: 'dateTime',
        valueGetter: (params) => new Date(params.value as string),
      },
      {
        field: 'updatedAt',
        headerName: t('updatedAt'),
        flex: 1,
        type: 'dateTime',
        valueGetter: (params) => new Date(params.value as string),
      },
    ]

    // Combine base with conditional columns
    const combinedColumns = isSmallScreen ? baseColumns : [...baseColumns, ...largeScreenColumns]

    // Adjust actions for small screens
    const actionsColumn: GridColDef = {
      field: 'actions',
      headerName: t('actions'),
      flex: 1,
      type: 'actions',
      getActions: (params) => {
        const actions = [
          <GridActionsCellItem icon={<Save />} label={t('save')} />,
          <GridActionsCellItem
            icon={<Edit />}
            label={t('edit')}
            onClick={() => {
              navigate(`/article/${params.id}/edit`)
            }}
          />,
        ]
        return actions
      },
    }

    return [...combinedColumns, actionsColumn]
  }, [navigate, t, isSmallScreen])

  return { columns }
}

export default useArticleManagementColumns
