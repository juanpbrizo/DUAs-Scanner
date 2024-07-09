import bcryptjs from 'bcryptjs'

import User from '../database/models/User.js'

import sendMails from '../helpers/sendMails.js'
import validationDb from '../helpers/validationDb.js'
import newUid from '../helpers/newUid.js'
import { jwtEncode } from '../helpers/jwt.js'

//Consulta los usuarios registrados.
const getUsers = async (req, res) => {
  const { type, id } = req.userAuth

  //Verifica que el usuarios sea Admin
  if (type !== 'Admin') {
    return res.status(403).send({ status: 'error', msg: 'Acceso denegado' })
  }

  try {
    //Consulta la lista de usuarios
    const users = await User.findAll({
      attributes: ['email', 'status', 'type'],
    })

    //Renueva el token de sesión
    const payload = { id, type }
    const token = jwtEncode(payload)

    res.status(200).send({
      status: 'successful',
      msg: 'Listado de usuarios',
      data: users,
      token,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).send({
      status: 'error',
      msg: 'error general, comunicarse con el administrador.',
    })
  }
}

//Actualizar usuarios (Cambios de estados, solicitud de cambio de contraseña)
const putUsers = async (req, res) => {
  const { email, status } = req.body
  const { type, id } = req.userAuth

  //Verifica que el usuarios sea Admin
  if (type !== 'Admin') {
    return res.status(403).send({ status: 'error', msg: 'Acceso denegado' })
  }

  try {
    //Verifica que el usuario exista en la base de datos.
    const schema = { where: { email } }
    const user = await validationDb(schema, User, true)
    if (!user) {
      return res.status(404).send({ status: 'error', msg: 'Usuario no encontrado' })
    }

    //Verifica si el cambio de estado es por cambio de reset de password.
    switch (status) {
      //reset password
      case 'P':
        //Genera un nuevo Token uid para el usuario.
        const uid = newUid()
        await User.update({ status, uid }, { where: { email } })

        // Enviar mail para confirmacion de contraseña.
        const url = process.env.URL_FRONTEND + '/Passwords/' + uid
        const dataMail = {
          email,
          asunto: 'Cambio de contraseña',
          message: `<p>Se ha solicitado un cambio de contraseña, para establecer una contraseña nueva, por favor click: <a href="${url}">Aqui<a><p>`,
        }
        await sendMails(dataMail)
        break

      //Bloquea al usuario
      case 'B':
        await User.update({ status }, { where: { email } })
        break

      //Habilita al usuario
      case 'H':
        await User.update({ status }, { where: { email } })
        break
      default:
        return res.status(404).send({ status: 'error', error: 'No se reconoce el estado asignado' })
    }

    //Renueva el token de sesión
    const payload = { id, type }
    const token = jwtEncode(payload)

    res.send({
      status: 'successful',
      msg: 'Usuario ha sido actualizado',
      data: '',
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

//Actualizar contraseñas de usuarios
const putPassword = async (req, res) => {
  const uid = req.params.uid.split(' ').join('')
  const { password } = req.body

  if (uid == '') {
    return res.status(400).send({ status: 'error', msg: 'Token reset invalido' })
  }

  try {
    //Verifica si el uid es valido.
    const schema = { where: { uid } }
    const user = await validationDb(schema, User, true)
    if (!user) {
      return res.status(400).send({ status: 'error', msg: 'Token reset invalido' })
    }

    //Encripta contraseña y actualiza el usuarios
    const salt = bcryptjs.genSaltSync()
    const hashPassword = bcryptjs.hashSync(password, salt)
    await User.update({ password: hashPassword, status: 'H', uid: null }, { where: { uid } })

    res.status(200).send({
      status: 'successful',
      msg: 'Contraseña establecida',
      data: '',
      token: '',
    })
  } catch (error) {
    console.error(error)
    return res.status(500).send({
      status: 'error',
      msg: 'Error general, comunicarse con el administrador.',
    })
  }
}

//Crear Nuevos usuarios
const postUsers = async (req, res) => {
  const { email } = req.body
  const { type, id } = req.userAuth

  //Verifica que el usuarios sea Admin
  if (type !== 'Admin') {
    return res.status(403).send({ status: 'error', msg: 'Acceso denegado' })
  }

  try {
    //Verifica si el usuario ya se encuentra registrado.
    const schema = { where: { email } }
    const response = await validationDb(schema, User, false)
    if (!response) {
      return res.status(400).send({ status: 'error', msg: 'El email ya se encuentra registrado' })
    }

    //Genera un nuevo Token uid para el usuario.
    const uid = newUid()
    await User.create({ email, uid })

    //Envía correo para activación de cuenta.
    const user = await validationDb(schema, User, true)
    const url = process.env.URL_FRONTEND + '/Passwords/' + user.uid
    const dataMail = {
      email,
      asunto: 'Alta de Usuario',
      message: `<p>Se ha dado de alta su usuario en Importaciones para establecer su contraseña y activar su cuenta, por favor click: <a href="${url}">Aquí<a><p>`,
    }
    await sendMails(dataMail)

    //Renueva el token de sesión
    const payload = { id, type }
    const token = jwtEncode(payload)

    res.status(200).send({
      status: 'successful',
      msg: 'Usuario creado correctamente',
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

export { getUsers, putUsers, postUsers, putPassword }
