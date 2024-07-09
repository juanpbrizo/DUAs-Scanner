import { useState } from 'react'
import axios from 'axios'
import MUIDataTable from 'mui-datatables'
import RingLoader from 'react-spinners/RingLoader'
import tableResults from '../helpers/tables'

const Import = () => {
  //Variable de estado
  const URL_API = import.meta.env.VITE_URL_API
  const [spinner, setSpinner] = useState(false)
  const [partida, setPartida] = useState('')
  const [description, setDescription] = useState('')
  const [importer, setImporter] = useState('')
  const [fDesde, setFDesde] = useState('1993-01-01')
  const [fHasta, setFHasta] = useState('1993-12-30')
  const [datos, setDatos] = useState([])

  //Consulta base de datos importaciones.
  const postImport = async (e) => {
    e.preventDefault()

    //Estructura la consulta al Backend
    const token = localStorage.getItem('token')
    const config = { headers: { 'x-access-token': token } }
    const parameters = { partida, description, importer, fDesde, fHasta }
    const url = URL_API + '/api/import'

    try {
      //Envía la consulta al backend
      setSpinner(true)
      const respuesta = await axios.post(url, parameters, config)
      setSpinner(false)
      setDatos(respuesta.data.data)

      //Almacena nuevo token de sesión
      localStorage.setItem('token', respuesta.data.token)
    } catch (error) {
      console.log(error.response.data)
      if (error.response.data.msg === 'Token inválido') {
        window.location.href = '/'
      }
    }
  }
  return (
    <>
      <div className=' flex flex-col md:flex-row max-w-screen'>
        {/* Formulario de Búsqueda */}
        <div className=' border-black border-double border-4 mx-auto md:mx-5 my-7 rounded-2xl w-11/12 md:w-96 h-full'>
          <h2 className=' p-2 text-2xl md:text-4xl font-bold ml-5 -mt-7 bg-white inline-block '>
            Buscador
          </h2>
          <form onSubmit={postImport} className='text-left mb-5'>
            <div className='mb-8 block ml-5'>
              <label className=' font-bold text-1xl block' htmlFor='partida'>
                Partida
              </label>
              <input
                type='text'
                id='partida'
                name='partida'
                value={partida}
                placeholder='Nº de Partida'
                onChange={(e) => setPartida(e.target.value)}
                className=' border-b border-gray-300 py-2 px-4 w-64 focus:outline-none focus:border-blue-500'
              />
            </div>
            <div className='mb-8 block ml-5'>
              <label className=' font-bold text-1xl block' htmlFor='description'>
                Descripción
              </label>
              <input
                type='text'
                id='description'
                name='description'
                value={description}
                placeholder='- Para mas de una descripción'
                onChange={(e) => setDescription(e.target.value)}
                className=' border-b border-gray-300 py-2 px-4 w-64 focus:outline-none focus:border-blue-500'
              />
            </div>
            <div className='mb-8 block ml-5'>
              <label className=' font-bold text-1xl block' htmlFor='importador'>
                Importador
              </label>
              <input
                type='text'
                id='importador'
                name='importador'
                value={importer}
                placeholder='Importador'
                onChange={(e) => setImporter(e.target.value)}
                className=' border-b border-gray-300 py-2 px-4 w-64 focus:outline-none focus:border-blue-500'
              />
            </div>
            <div className='mb-5 inline-block ml-5'>
              <label className=' font-bold text-1xl block' htmlFor='fDesde'>
                Fecha - Desde
              </label>
              <input
                type='date'
                id='fDesde'
                name='fDesde'
                value={fDesde}
                onChange={(e) => setFDesde(e.target.value)}
                className=' border-b border-gray-300 py-2 px-4 w-40 focus:outline-none focus:border-blue-500'
                required
                min='1993-01-01'
              />
            </div>
            <div className='mb-5 inline-block ml-5'>
              <label className=' font-bold text-1xl block' htmlFor='fHasta'>
                Fecha - Desde
              </label>
              <input
                type='date'
                id='fHasta'
                name='fHasta'
                value={fHasta}
                onChange={(e) => setFHasta(e.target.value)}
                className=' border-b border-gray-300 py-2 px-4 w-40 focus:outline-none focus:border-blue-500'
                required
                min='1993-01-01'
              />
            </div>
            <div className='text-right mr-8'>
              <button
                type='submit'
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded '
              >
                Buscar
              </button>
            </div>
          </form>
        </div>

        {/* Resultado de Búsqueda */}
        <div className=' m-5 my-7 flex-1 overflow-auto rounded-2xl'>
          {datos.length > 0 && (
            <div>
              <h2 className='p-2 text-2xl md:text-4xl font-bold ml-5 -mt-7 bg-white inline-block absolute z-10'>
                Importaciones
              </h2>
              <div className='border-black border-double border-4 rounded-2xl overflow-hidden'>
                <MUIDataTable
                  columns={tableResults.columns}
                  data={datos}
                  options={tableResults.options}
                />
              </div>
            </div>
          )}
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

export default Import
