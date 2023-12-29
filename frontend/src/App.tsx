/* --- STYLES --- */
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import './assets/styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'

/* --- COMPONENTS --- */
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { Suspense } from 'react'
import AppRouter from './AppRouter'
import { PageLayout } from './modules/common/components/Layout/Layout'

/* --- CONSTANTS and FUNCTIONS --- */
import theme from './modules/common/utils/theme'
import { initI18next } from './modules/common/utils/i18next'

console.log('👋')

initI18next()

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
      </ThemeProvider>
    </>
  )
}

export default App
