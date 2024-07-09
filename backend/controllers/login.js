import validationDb from '../helpers/validationDb.js'
import User from '../database/models/User.js'
import { jwtEncode } from '../helpers/jwt.js'
import bcryptjs from 'bcryptjs'

const postLogin = async (req, res) => {
  const { email, password } = req.body

  try {
    //Valida si el correo esta registrado.
    const schema = { where: { email } }
    const user = await validationDb(schema, User, true)
    if (!user) {
      return res.status(401).send({ status: 'error', msg: 'Usuario Invalido' })
    }

    //Valida si el usuario esta habilitado
    if (user.status !== 'H') {
      return res.status(401).send({ status: 'error', msg: 'El usuario no esta Habilitado' })
    }

    //Valida la contraseña suministrada.
    const compare = bcryptjs.compareSync(password, user.password)
    if (!compare) {
      return res.status(401).send({ status: 'error', msg: 'Usuario Invalido' })
    }

    //Codifica el id de usuario para usarlo como token de sesión.
    const payload = { id: user.id, type: user.type }
    const token = jwtEncode(payload)

    res.status(200).send({
      status: 'successful',
      msg: 'Bienvenido a Importaciones',
      data: '',
      token,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).send({
      status: 'error',
      msg: 'Error general, comunicarse con el administrador',
    })
  }
}

export default postLogin
