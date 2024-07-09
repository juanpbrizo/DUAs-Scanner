import { DataTypes, Model } from 'sequelize'
import sequelize from '../db.js'

class User extends Model {}

User.init(
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      defaultValue: '123456',
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'P',
    },
    uid: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.STRING,
      defaultValue: 'User',
    },
  },
  {
    sequelize,
    modelName: 'User',
  }
)

export default User
