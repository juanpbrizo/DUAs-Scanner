import { useState, useEffect } from 'react'
import axios from 'axios'

const Login = () => {
  // Estados para manejar los valores de los campos del formulario
  const URL_API = import.meta.env.VITE_URL_API
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')

  // Función para manejar el envío del formulario
  const postLogin = async (e) => {
    e.preventDefault()
    const url = URL_API + '/api/login'

    try {
      const respuesta = await axios.post(url, { email, password })

      setStatus(respuesta.data.status)
      setMessage(respuesta.data.msg)

      localStorage.setItem('token', respuesta.data.token)

      setTimeout(() => {
        window.location.href = '/auth/import'
      }, 1000)
    } catch (error) {
      console.log(error.response.data)
      setMessage(error.response.data.msg)
      setStatus(error.response.data.status)
    }
  }

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        setMessage('')
      }, 3000)
    }
  }, [message])
  return (
    <>
      <div className=' w-90 md:w-96 h-96'>
        <h1 className='font-bold font-serif text-blue-900 text-4xl pb-10'>Iniciar Sesión</h1>
        <form onSubmit={postLogin} className='text-left mb-5'>
          <div className='mb-8'>
            <input
              type='email'
              id='email'
              name='email'
              value={email}
              placeholder='Email'
              onChange={(e) => setEmail(e.target.value)}
              className='bg-slate-100 border-b border-gray-300 py-3 px-4 w-full focus:outline-none focus:border-blue-500'
              required
            />
          </div>
          <div className='mb-10'>
            <input
              type='password'
              id='password'
              name='password'
              value={password}
              placeholder='Contraseña'
              onChange={(e) => setPassword(e.target.value)}
              className='bg-slate-100 border-b border-gray-300 py-2 px-4 w-full focus:outline-none focus:border-blue-5000'
              required
            />
          </div>
          <div className='text-right'>
            <button
              type='submit'
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded '
            >
              Ingresar
            </button>
          </div>
        </form>
        {/* Alerta */}
        {message && (
          <div
            className={`text-center px-4 py-3 rounded relative ${
              status === 'error'
                ? 'bg-red-100 border border-red-400 text-red-700'
                : 'bg-green-100 border border-green-400 text-green-700'
            }`}
            role='alert'
          >
            <span className='block sm:inline'>{message}</span>
          </div>
        )}
      </div>
    </>
  )
}

export default Login
