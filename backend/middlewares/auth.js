import User from '../database/models/User.js'
import validationDb from '../helpers/validationDb.js'
import { jwtDecode } from '../helpers/jwt.js'

const auth = async (req, res, next) => {
  const token = req.headers['x-access-token']
  try {
    const payload = jwtDecode(token)
    const schema = { where: { id: payload.id } }
    const userAuth = await validationDb(schema, User, true)

    if (!userAuth) {
      return res.status(400).send({
        status: 'error',
        msg: 'Token inválido',
      })
    }

    if (userAuth.status !== 'H') {
      return res.status(400).send({
        status: 'error',
        msg: 'El usuario no esta Habilitado',
      })
    }
    req.userAuth = userAuth
    next()
  } catch (error) {
    return res.status(error.code).send({
      status: 'error',
      msg: error.message,
    })
  }
}

export default auth
