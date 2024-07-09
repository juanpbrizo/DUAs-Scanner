import { useState, useEffect } from 'react'
import axios from 'axios'
import MUIDataTable from 'mui-datatables'
import RingLoader from 'react-spinners/RingLoader'

const Users = () => {
  //Variables de estado
  const URL_API = import.meta.env.VITE_URL_API
  const [spinner, setSpinner] = useState(false)
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')
  const [users, setUsers] = useState([])

  //Consulta lista de usuarios
  const getUsers = async () => {
    //Estructura la consulta al Backend
    const token = localStorage.getItem('token')
    const config = { headers: { 'x-access-token': token } }
    const url = URL_API + '/api/users'

    try {
      //Envía la consulta al backend
      setSpinner(true)
      const respuesta = await axios.get(url, config)
      setSpinner(false)
      setUsers(respuesta.data.data)

      //Almacena nuevo token de sesión
      localStorage.setItem('token', respuesta.data.token)
    } catch (error) {
      setSpinner(false)
      console.log(error.response.data)
      if (error.response.data.msg === 'Token inválido') {
        window.location.href = '/'
      }
      setMessage(error.response.data.msg)
      setStatus(error.response.data.status)
    }
  }

  //Agrega nuevo usuario
  const postUsers = async (e) => {
    e.preventDefault()

    //Estructura la consulta al Backend
    const token = localStorage.getItem('token')
    if (!token) {
      window.location.href = '/'
    }
    const config = { headers: { 'x-access-token': token } }
    const url = URL_API + '/api/users'

    try {
      //Envía la consulta al backend
      setSpinner(true)
      const respuesta = await axios.post(url, { email }, config)
      setSpinner(false)

      //Limpia formulario
      setEmail('')

      //Mostrar mensaje de respuesta satisfactoria
      setMessage(respuesta.data.msg)
      setStatus(respuesta.data.status)

      //actualiza tabla de usuarios
      getUsers()

      //Almacena nuevo token de sesión
      localStorage.setItem('token', respuesta.data.token)
    } catch (error) {
      setSpinner(false)
      console.log(error.response.data)
      if (error.response.data.msg === 'Token inválido') {
        window.location.href = '/'
      }
      setMessage(error.response.data.msg)
      setStatus(error.response.data.status)
    }
  }

  //Actualiza estado de usuario
  const putUser = async (data) => {
    const { status, email } = data

    //Estructura la consulta al Backend
    const token = localStorage.getItem('token')
    if (!token) {
      window.location.href = '/'
    }
    const config = { headers: { 'x-access-token': token } }
    const url = URL_API + '/api/users'

    try {
      // Envía la consulta al backend
      setSpinner(true)
      const respuesta = await axios.put(url, { email, status }, config)
      setSpinner(false)

      setStatus(respuesta.data.status)
      setMessage(respuesta.data.msg)
    } catch (error) {
      setStatus(error.response.data.status)
      return setMessage(error.response.data.msg)
    }
  }

  // Efecto para realizar la consulta POST al montar el componente
  useEffect(() => {
    if (message) {
      setTimeout(() => {
        setMessage('')
      }, 3000)
    }
    getUsers()
  }, [message])

  const tableUsers = {
    columns: [
      {
        name: 'email',
        label: 'CORREO',
        options: {
          filter: false,
          customHeadRender: (columnMeta) => (
            <th key={columnMeta.index} className='text-center'>
              {columnMeta.label}
            </th>
          ),
          customBodyRender: (value) => <div className='text-center'>{value}</div>,
        },
      },
      {
        name: 'status',
        label: 'ESTATUS',
        options: {
          customHeadRender: (columnMeta) => (
            <th key={columnMeta.index} className='text-center'>
              {columnMeta.label}
            </th>
          ),
          customBodyRender: (value) => <div className='text-center'>{value}</div>,
        },
      },
      {
        name: 'type',
        label: 'TIPO',
        options: {
          customHeadRender: (columnMeta) => (
            <th key={columnMeta.index} className='text-center'>
              {columnMeta.label}
            </th>
          ),
          customBodyRender: (value) => <div className='text-center'>{value}</div>,
        },
      },
      {
        name: 'ACCION',
        label: 'ACCIÓN',
        options: {
          filter: false,
          sort: false,
          customHeadRender: (columnMeta) => (
            <th key={columnMeta.index} className='text-center'>
              {columnMeta.label}
            </th>
          ),
          customBodyRender: (value, tableMeta) => {
            const status = tableMeta.rowData[1]
            return (
              <div className='text-center'>
                {status !== 'B' && (
                  <button
                    className='bg-red-500 text-white px-4 py-2 rounded mr-2'
                    onClick={() => putUser({ status: 'B', email: tableMeta.rowData[0] })}
                  >
                    Bloquear
                  </button>
                )}
                {status !== 'H' && status !== 'P' && (
                  <button
                    className='bg-green-500 text-white px-4 py-2 rounded mr-2'
                    onClick={() => putUser({ status: 'H', email: tableMeta.rowData[0] })}
                  >
                    Habilitar
                  </button>
                )}
              </div>
            )
          },
        },
      },
      {
        name: 'Reset_Pass',
        label: 'CAMBIAR CONTRASEÑA',
        options: {
          filter: false,
          sort: false,
          customHeadRender: (columnMeta) => (
            <th key={columnMeta.index} className='text-center'>
              {columnMeta.label}
            </th>
          ),
          customBodyRender: (value, tableMeta) => {
            const status = tableMeta.rowData[1]
            return (
              <div className='text-center'>
                <button
                  className={`bg-orange-500 text-white px-4 py-2 rounded ${
                    status === 'B' ? 'opacity-50' : ''
                  }`}
                  onClick={() => putUser({ status: 'P', email: tableMeta.rowData[0] })}
                  disabled={status === 'B' ? true : false}
                >
                  Reset. Contr.
                </button>
              </div>
            )
          },
        },
      },
    ],
    options: {
      filter: true,
      filterType: 'checkbox',
      print: false,
      rowsPerPage: 5,
      rowsPerPageOptions: [5],
      selectableRows: 'none',
      download: false,
      viewColumns: false,
      responsive: false,
    },
  }

  return (
    <>
      {/* Agregar Nuevo usuario */}
      <div className=' mx-3 md:mx-20 mt-7 mb-3 flex-1 overflow-auto border-black border-double border-4 rounded-2xl'>
        <h2 className='p-2 text-2xl md:text-4xl font-bold ml-5 -mt-7 bg-white inline-block absolute'>
          Agregar Usuario
        </h2>
        <form onSubmit={postUsers} className='text-left mb-5'>
          <div className='mb-8 pt-10 px-4 md:px-20'>
            <input
              type='email'
              id='email'
              name='email'
              value={email}
              placeholder='Email'
              onChange={(e) => setEmail(e.target.value)}
              className='border-b border-gray-300 py-3 px-4 w-full focus:outline-none focus:border-blue-500'
              required
            />
          </div>
          <div className='text-right px-4 md:px-20'>
            <button
              type='submit'
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded '
            >
              Registrar
            </button>
          </div>
        </form>
      </div>

      {/* Alerta */}
      {message && (
        <div
          className={`mx-20 text-center px-4 py-3 rounded relative ${
            status === 'error'
              ? 'bg-red-100 border border-red-400 text-red-700'
              : 'bg-green-100 border border-green-400 text-green-700'
          }`}
          role='alert'
        >
          <span className='block sm:inline'>{message}</span>
        </div>
      )}

      {/* Tabla Usuarios */}
      <div className=' mx-3 md:mx-20 mt-7 mb-3 flex-1 overflow-auto rounded-2xl'>
        <h2 className='p-2 text-2xl md:text-4xl font-bold ml-5 -mt-7 bg-white inline-block absolute z-10'>
          Usuarios
        </h2>
        <div className='border-black border-double border-4 rounded-2xl overflow-hidden'>
          <MUIDataTable columns={tableUsers.columns} data={users} options={tableUsers.options} />
        </div>
      </div>

      {/* Spinner */}
      <div
        className={`fixed inset-0 flex items-center justify-center z-50 ${spinner ? '' : 'hidden'}`}
      >
        <RingLoader
          loading='true'
          color='rgba(54, 215, 183, 1)'
          size={100}
          cssOverride={{ display: 'block' }}
        />
      </div>
    </>
  )
}

export default Users
