import User from '../database/models/User.js'
import bcryptjs from 'bcryptjs'
import dotenv from 'dotenv'
dotenv.config()

const email = process.env.ADMIN_EMAIL
const uid = process.env.ADMIN_UID
const password = process.env.ADMIN_PASSWORD
const type = process.env.ADMIN_TYPE
const status = process.env.ADMIN_STATUS

const populationUser = async () => {
  const numUsers = await User.count({})

  if (numUsers === 0) {
    const salt = bcryptjs.genSaltSync()
    const hashPassword = bcryptjs.hashSync(password, salt)
    await User.create({
      email,
      uid,
      password: hashPassword,
      type,
      status,
    })
    return 'Base de datos conectada y Usuario admin creado'
  }
  return 'Base de datos conectada'
}

export default populationUser
