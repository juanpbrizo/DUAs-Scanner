import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthLayout, UserLayout } from './Layout'
import { Login, Passwords, Users, Import } from './Components'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas para las páginas de autenticación */}
        <Route path='/' element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path='login' element={<Login />} />
          <Route path='Passwords/:uid' element={<Passwords />} />
        </Route>

        {/* Rutas para las páginas de importación */}
        <Route path='auth' element={<UserLayout />}>
          <Route path='Import' element={<Import />} />
          <Route path='Users' element={<Users />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
