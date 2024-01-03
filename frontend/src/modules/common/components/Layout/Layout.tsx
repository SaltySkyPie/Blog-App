import Container from '@mui/material/Container'
import useTheme from '@mui/material/styles/useTheme'
import useMediaQuery from '@mui/material/useMediaQuery'
import { ToastContainer } from 'react-toastify'
import Navbar from './Navigation/Navbar'

export function PageLayout(props: React.PropsWithChildren) {
  const { children } = props
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  return (
    <>
      <main>
        <Navbar />
        <Container maxWidth="xl">{children}</Container>
      </main>

      <ToastContainer
        position={isMobile ? 'top-center' : 'top-right'}
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}
