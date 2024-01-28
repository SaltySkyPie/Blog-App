import { Card, styled } from '@mui/material'

export const ArticleCard = styled(Card)(({ theme }) => ({
  display: 'block', // default display
  [theme.breakpoints.up('md')]: {
    display: 'flex', // display flex on medium devices and up
  },
  // Add other styles as needed
  boxShadow: theme.shadows[3], // elevation 3 shadow
}))
