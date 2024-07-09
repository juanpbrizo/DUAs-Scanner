import { Op } from 'sequelize'
import tables from '../database/models/Tables.js'
import { jwtEncode } from '../helpers/jwt.js'

const getImport = (req, res) => {
  const { type, email } = req.userAuth
  res.status(200).send({
    status: 'successful',
    msg: 'Autorizado',
    type,
    email,
  })
}
const postImport = async (req, res) => {
  const { partida, description, importador, fDesde, fHasta } = req.body
  const { id, type } = req.userAuth

  try {
    //Estructuración de la consulta a la Base de Datos
    const desde = new Date(fDesde)
    const hasta = new Date(fHasta)

    const startYear = desde.getFullYear()
    const endYear = hasta.getFullYear()

    const opOr = []

    partida != '' ? opOr.push({ CNAN: partida }) : null
    description != '' ? opOr.push({ DESC_COM: { [Op.like]: `%${description}%` } }) : null
    importador != '' ? opOr.push({ IMPORTADOR: { [Op.like]: `%${importador}%` } }) : null

    let schema
    const attributes = [
      'CNAN',
      'DESCRIP',
      'FECHA',
      'CADUANA',
      'ADUA_DESC',
      'CPAIS',
      'PAIS_DESC',
      'FOB_DOLPOL',
      'FLE_DOLAR',
      'SEG_DOLAR',
      'CIF_DOLAR',
      'PESO_NETO',
      'PESO_BRUTO',
      'UNID_FIQTY',
      'UNID_FIDES',
      'DESC_COM',
      'PUER_EMBAR',
      'PUER_DESC',
      'FECH_LLEGA',
      'NUME_CORRE',
      'NUME_SERIE',
      'VIA_TRANSP',
      'VIAT_DESC',
      'SEST_MERCA',
      'SEST_DESC',
      'TIPO_DOCUM',
      'LIBR_TRIBU',
      'IMPORTADOR',
      'CPAIS_PROC',
      'DPAIS_PROC',
    ]

    if (opOr.length > 0) {
      schema = {
        attributes,
        where: { [Op.or]: opOr, FECHA: { [Op.between]: [desde, hasta] } },
      }
    } else {
      schema = {
        attributes,
        where: { FECHA: { [Op.between]: [desde, hasta] } },
      }
    }

    const data = []

    for (let year = startYear; year <= endYear; year++) {
      const table = `A${year}`

      if (tables[table]) {
        // Verifica que el modelo exista
        const results = await tables[table].findAll(schema)
        data.push(...results)
      }
    }

    if (!data) {
      return res.status(204).send({
        status: 'successful',
        msg: 'No existen importaciones que coincidan con los parámetros de búsqueda',
      })
    }

    //Renueva el token de sesión
    const payload = { id, type }
    const token = jwtEncode(payload)

    res.status(200).send({
      status: 'successful',
      msg: 'Listado de importaciones',
      data,
      token,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).send({
      status: 'error',
      msg: 'Error general, comunicarse con el administrador.',
    })
  }
}

export { postImport, getImport }
