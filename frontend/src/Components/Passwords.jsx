import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const Passwords = () => {
  // Cambiado a 'PasswordReset' y convertido en un componente funcional
  // Estados para manejar los valores de los campos del formulario
  const URL_API = import.meta.env.VITE_URL_API
  const [password, setPassword] = useState('')
  const [passwordRepeat, setPasswordRepeat] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')
  const { uid } = useParams()

  // Función para manejar el envío del formulario
  const putPassword = async (e) => {
    e.preventDefault()

    //Verifica que las contraseñas coincidan
    if (password !== passwordRepeat) {
      setStatus('error')
      return setMessage('Las contraseñas no coinciden')
    }
    const url = URL_API + '/api/users/password/' + uid

    try {
      //Extrae el uid del URL y envía petición al Backend
      const respuesta = await axios.put(url, { password })

      setStatus(respuesta.data.status)
      setMessage(respuesta.data.msg)
      setTimeout(() => {
        window.location.href = '/login'
      }, 3000)
    } catch (error) {
      // console.log(error.response.data);
      setStatus(error.response.data.status)
      return setMessage(error.response.data.msg)
    }
  }

  //Funcion para mostrar mensaje alerta
  useEffect(() => {
    if (message) {
      setTimeout(() => {
        setMessage('')
      }, 3000)
    }
  }, [message])

  return (
    <>
      <div className='  w-96 h-96'>
        <h1 className='font-bold font-serif text-blue-900 text-4xl pb-10'>Establecer Contraseña</h1>
        <form onSubmit={putPassword} className='text-left mb-5'>
          <div className='mb-8'>
            <input
              type='password'
              id='password'
              name='password'
              value={password}
              placeholder='Contraseña'
              onChange={(e) => setPassword(e.target.value)}
              className='bg-slate-100 border-b border-gray-300 py-3 px-4 w-full focus:outline-none focus:border-blue-500'
              required
            />
          </div>
          <div className='mb-8'>
            <input
              type='password'
              id='passwordRepeat'
              name='passwordRepeat'
              value={passwordRepeat}
              placeholder='Repetir Contraseña'
              onChange={(e) => setPasswordRepeat(e.target.value)}
              className='bg-slate-100 border-b border-gray-300 py-3 px-4 w-full focus:outline-none focus:border-blue-500'
              required
            />
          </div>
          <div className='text-right'>
            <button
              type='submit'
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded '
            >
              Enviar
            </button>
          </div>
        </form>
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

export default Passwords
