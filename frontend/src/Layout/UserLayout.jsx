import { useState, useEffect } from 'react'
import axios from 'axios'
import { Outlet, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import logo from '/Logo.png'
import fondoLogin from '/Fondo-Login.png'

const URL_API = import.meta.env.VITE_URL_API
const UserLayout = () => {
  const [margenMenu, setMargenMenu] = useState(true)
  const [urlMenu, setUrlMenu] = useState('')
  const [user, setUser] = useState('')

  const ocultarMenu = () => {
    setMargenMenu(!margenMenu)
  }

  const logout = () => {
    localStorage.removeItem('token')
    window.location.href = '/'
  }

  useEffect(() => {
    const userAuth = async () => {
      const token = localStorage.getItem('token')
      const config = { headers: { 'x-access-token': token } }
      const url = URL_API + '/api/import'

      try {
        const respuesta = await axios.get(url, config)
        setUrlMenu(respuesta.data.type)
        setUser(respuesta.data.email)
      } catch (error) {
        console.log(error.response.data)
        window.location.href = '/'
      }
    }
    userAuth()
  }, [])

  return (
    <>
      {/* Encabezado de Pagina */}
      <div className=' flex justify-between bg-blue-500 w-full h-16'>
        <div
          className='flex items-center justify-center border-2 m-2 ml-10 w-14 rounded-md'
          onClick={ocultarMenu}
        >
          <FontAwesomeIcon icon={faBars} className='text-white h-6' />
        </div>
        <div className='flex items-center justify-center m-2 w-14 mr-10'>
          <img src={logo} alt='Logo' className='w-40' />
        </div>
      </div>

      {/* //Menu lateral */}
      <div
        className={` w-full min-h-screen absolute z-20  ${margenMenu ? 'hidden' : 'block'}`}
        onClick={ocultarMenu}
      ></div>
      <div
        className={` flex flex-col absolute z-20 top-0 w-96 min-h-screen bg-cover bg-center  transition-margin duration-500 ease-in-out ${
          margenMenu ? '-ml-96' : 'ml-0'
        }`}
        style={{ backgroundImage: `url(${fondoLogin})` }}
      >
        <div className='flex justify-end h-16 border-double border-b-4'>
          <div className='flex items-center ml-4 flex-grow'>
            <p className='text-white font-bold uppercase'>{user}</p>
          </div>
          <div
            className='flex items-center justify-center border-2 m-2 mr-10 w-14 rounded-md '
            onClick={ocultarMenu}
          >
            <FontAwesomeIcon icon={faBars} className='text-white h-6' />
          </div>
        </div>
        <div className=' w-full flex-grow p-5   '>
          <div>
            <div className='p-2'>
              <Link
                className='text-white hover:underline p-5'
                to='/auth/import'
                onClick={ocultarMenu}
              >
                Buscador
              </Link>
            </div>
            <div className='p-2'>
              {urlMenu == 'Admin' && (
                <Link
                  className='text-white hover:underline p-5'
                  to='/auth/users'
                  onClick={ocultarMenu}
                >
                  Usuarios
                </Link>
              )}
            </div>
          </div>
        </div>
        <div className='h-14 text-right'>
          <button
            type='submit'
            className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-5'
            onClick={logout}
          >
            Cerrar
          </button>
        </div>
      </div>

      {/* //Cuerpo de Pagina. */}
      <Outlet />
    </>
  )
}

export default UserLayout
