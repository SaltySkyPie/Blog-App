/* --- STYLES --- */
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import 'react-toastify/dist/ReactToastify.css'
import './assets/styles/globals.css'

/* --- COMPONENTS --- */
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { Suspense } from 'react'
import AppRouter from './AppRouter'
import { PageLayout } from './modules/common/components/Layout/Layout'
import { ApolloAppProvider } from './modules/common/utils/apollo'
import { AuthProvider } from './modules/auth/components/Provider/AuthProvider'

/* --- CONSTANTS and FUNCTIONS --- */
import { initI18next } from './modules/common/utils/i18next'
import theme from './modules/common/utils/theme'

console.log('👋')

void initI18next()

function App() {
  return (
    <>
    <AuthProvider>
      <ApolloAppProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <PageLayout>
            <Suspense fallback={<></>}>
              <AppRouter />
            </Suspense>
          </PageLayout>
        </ThemeProvider>
      </ApolloAppProvider>
    </AuthProvider>
    </>
  )
}

export default App
