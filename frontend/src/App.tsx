/* --- STYLES --- */
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import './assets/styles/globals.css'
import './assets/styles/toast.css'

/* --- COMPONENTS --- */
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { Suspense } from 'react'
import { ToastContainer } from 'react-toastify'
import AppRouter from './AppRouter'
import { PageLayout } from './modules/common/components/Layout/Layout'

/* --- CONSTANTS --- */
import theme from './modules/common/utils/theme'

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <PageLayout>
          <Suspense fallback={<></>}>
            <AppRouter />
          </Suspense>
        </PageLayout>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </ThemeProvider>
    </>
  )
}

export default App
