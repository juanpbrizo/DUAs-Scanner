import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import indexRouter from './routes/index.js'
import sequelize from './database/db.js'
import User from './database/models/User.js'
import populationUser from './helpers/populationUser.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

// Configuración de CORS
app.use(
  cors({
    origin: 'http://serv-api.ddns.net',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  })
)

// Middleware para parsear JSON
app.use(express.json())

// Rutas
app.use('/api', indexRouter)

// Middleware para manejar errores
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Error interno del servidor')
})

// Iniciar el servidor HTTP
app.listen(port, async () => {
  console.log(`Servidor HTTP funcionando en el puerto ${port}`)

  try {
    await sequelize.authenticate()
    // User.sync({ alter: true });

    const mensaje = await populationUser()
    console.log(mensaje)
  } catch (error) {
    console.error(error)
    throw new Error('No se ha podido conectar a la base de datos')
  }
})

export default app
