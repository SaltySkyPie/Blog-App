import LinearProgress from '@mui/material/LinearProgress'
import { Suspense, lazy } from 'react'
import { RequireAuth } from 'react-auth-kit'
import { Route, Routes } from 'react-router'

const ArticleList = lazy(() => import('./modules/article-list/components/ArticleList'))
const Article = lazy(() => import('./modules/article/components/Article'))
const NotFound = lazy(() => import('./modules/common/components/Misc/NotFound'))
const Login = lazy(() => import('./modules/auth/components/Login/Login'))
const Register = lazy(() => import('./modules/auth/components/Register/Register'))
const CreateArticle = lazy(() => import('./modules/article-creator/components/CreateArticle'))
const EditArticle = lazy(() => import('./modules/article-creator/components/EditArticle'))
const ArticleManagement = lazy(() => import('./modules/article-management/components/ArticleManagement'))

export default function AppRouter() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense fallback={<LinearProgress />}>
            <ArticleList />
          </Suspense>
        }
      />
      <Route
        path="/login"
        element={
          <Suspense fallback={<LinearProgress />}>
            <Login />
          </Suspense>
        }
      />
      <Route
        path="/register"
        element={
          <Suspense fallback={<LinearProgress />}>
            <Register />
          </Suspense>
        }
      />
      <Route
        path="/article/:id"
        element={
          <Suspense fallback={<LinearProgress />}>
            <Article />
          </Suspense>
        }
      />
      <Route
        path="/article/:id/edit"
        element={
          <RequireAuth loginPath={'/login'}>
            <Suspense fallback={<LinearProgress />}>
              <EditArticle />
            </Suspense>
          </RequireAuth>
        }
      />
      <Route
        path="/about"
        element={
          <Suspense fallback={<LinearProgress />}>
            <div>About</div>
          </Suspense>
        }
      />
      <Route
        path="/profile"
        element={
          <RequireAuth loginPath={'/login'}>
            <Suspense fallback={<LinearProgress />}>
              <div>Profile</div>
            </Suspense>
          </RequireAuth>
        }
      />
      <Route
        path="/profile/:id"
        element={
          <Suspense fallback={<LinearProgress />}>
            <div>Profile</div>
          </Suspense>
        }
      />
      <Route
        path="/article/create"
        element={
          <RequireAuth loginPath={'/login'}>
            <Suspense fallback={<LinearProgress />}>
              <CreateArticle />
            </Suspense>
          </RequireAuth>
        }
      />
      <Route
        path="/my-articles"
        element={
          <RequireAuth loginPath={'/login'}>
            <Suspense fallback={<LinearProgress />}>
              <ArticleManagement />
            </Suspense>
          </RequireAuth>
        }
      />

      <Route
        path="*"
        element={
          <Suspense fallback={<LinearProgress />}>
            <NotFound />
          </Suspense>
        }
      />
    </Routes>
  )
}
