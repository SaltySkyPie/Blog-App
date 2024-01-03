import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router'

const ArticleList = lazy(() => import('./modules/article-list/ArticleList'))
const NotFound = lazy(() => import('./modules/common/components/Misc/NotFound'))

export default function AppRouter() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense fallback={<></>}>
            <ArticleList />
          </Suspense>
        }
      />
      <Route
        path="*"
        element={
          <Suspense fallback={<></>}>
            <NotFound />
          </Suspense>
        }
      />
    </Routes>
  )
}
