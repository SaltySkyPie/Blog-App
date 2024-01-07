import { Grid, GridSize } from '@mui/material'

export default function ArticleItemContainer({
  children,
  xs,
  md,
  ...props
}: {
  children: React.ReactNode
  xs?: GridSize | boolean
  md?: GridSize | boolean
}) {
  return (
    <Grid item xs={xs ?? 12} md={md ?? 12} {...props}>
      {children}
    </Grid>
  )
}
