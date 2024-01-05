import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router'
import Register from './modules/auth/components/Register/Register'

const ArticleList = lazy(() => import('./modules/article-list/components/ArticleList'))
const NotFound = lazy(() => import('./modules/common/components/Misc/NotFound'))
const Login = lazy(() => import('./modules/auth/components/Login/Login'))

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
        path="/login"
        element={
          <Suspense fallback={<></>}>
            <Login />
          </Suspense>
        }
      />
      <Route
        path="/register"
        element={
          <Suspense fallback={<></>}>
            <Register />
          </Suspense>
        }
      />
      <Route
        path="/article/:id"
        element={
          <Suspense fallback={<></>}>
            <div>Article</div>
          </Suspense>
        }
      />
      <Route
        path="/about"
        element={
          <Suspense fallback={<></>}>
            <div>About</div>
          </Suspense>
        }
      />
      <Route
        path="/profile"
        element={
          <Suspense fallback={<></>}>
            <div>Profile</div>
          </Suspense>
        }
      />
      <Route
        path="/profile/:id"
        element={
          <Suspense fallback={<></>}>
            <div>Profile</div>
          </Suspense>
        }
      />
      <Route
        path="/create-article"
        element={
          <Suspense fallback={<></>}>
            <div>Create article</div>
          </Suspense>
        }
      />
      <Route
        path="/my-articles"
        element={
          <Suspense fallback={<></>}>
            <div>My articles</div>
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
