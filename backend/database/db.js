import { Sequelize } from 'sequelize'
import conf from './conf.js'

const sequelize = new Sequelize(
  conf.database.database,
  conf.database.username,
  conf.database.password,
  {
    host: conf.database.host,
    port: conf.database.port,
    dialect: 'mysql',
  }
)

export default sequelize
