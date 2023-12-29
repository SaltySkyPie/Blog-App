import { Route, Routes } from 'react-router'

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<>Hello World</>} />
    </Routes>
  )
}
