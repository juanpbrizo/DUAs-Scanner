import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import axios from 'axios'
import logo from '/Logo.png'
import fondoLogin from '/Fondo-Login.png'

const AuthLayout = () => {
  useEffect(() => {
    const URL_API = import.meta.env.VITE_URL_API

    const userAuth = async () => {
      const token = localStorage.getItem('token')
      const config = { headers: { 'x-access-token': token } }
      const url = URL_API + '/api/import'

      try {
        await axios.get(url, config)
        console.log('llegue aquí')
        window.location.href = '/auth/import'
      } catch (error) {
        console.log(error.response.data)
      }
    }
    userAuth()
  }, [])

  return (
    <>
      <div className='p-0 md:p-8 relative flex flex-col md:flex-row min-h-screen'>
        <div
          className='w-full md:w-2/4 ml-0 text-center flex items-center justify-center rounded-none md:rounded-l-lg bg-cover bg-center'
          style={{ backgroundImage: `url(${fondoLogin})` }}
        >
          <div className='flex flex-row md:flex-col'>
            <h2 className='hidden md:block font-bold font-serif text-slate-200 text-3xl p-5 md:p-0'>
              BIENVENIDO A
            </h2>
            <a href='/'>
              <img src={logo} alt='Logo' className='w-1/6 md:w-1/3 xl:w-40 mx-auto' />
            </a>
            <h1 className='hidden md:block font-bold font-serif text-slate-200 text-3xl p-5 md:p-0'>
              IMPORTACIONES
            </h1>
          </div>
        </div>

        <div className='w-full md:w-2/4 ml-0 bg-slate-100 flex flex-col md:flex-row items-center justify-center min-h-screen md:min-h-0 rounded-none md:rounded-r-lg'>
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default AuthLayout
