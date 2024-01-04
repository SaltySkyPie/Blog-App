import { useMediaQuery, useTheme } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'
import { BigScreenBox, SmallScreenBox } from './components/Box'

const Navbar: React.FC = () => {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'))
  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>{isSmallScreen ? <SmallScreenBox /> : <BigScreenBox />}</Toolbar>
      </Container>
    </AppBar>
  )
}
export default Navbar
