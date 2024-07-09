import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const jwtEncode = (payload) => {
  return jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
    expiresIn: '10m',
  })
}

const jwtDecode = (token) => {
  if (!token) {
    throw { message: 'Token inválido', code: 400 }
  }
  try {
    const payload = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
    return payload
  } catch (error) {
    throw { message: 'Token inválido', code: 401 }
  }
}

export { jwtEncode, jwtDecode }
