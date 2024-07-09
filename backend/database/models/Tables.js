import { DataTypes, Model } from 'sequelize'
import sequelize from '../db.js'

const tables = {}

// Definir modelos para las tablas desde A1993 hasta A2021
for (let year = 1993; year <= 2021; year++) {
  const tableName = `A${year}`
  class YearTable extends Model {}

  YearTable.init(
    {
      CNAN: {
        type: DataTypes.STRING(15),
        allowNull: true,
      },
      DESCRIP: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      FECHA: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      CADUANA: {
        type: DataTypes.STRING(4),
        allowNull: true,
      },
      ADUA_DESC: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      CPAIS: {
        type: DataTypes.STRING(3),
        allowNull: true,
      },
      PAIS_DESC: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      FOB_DOLPOL: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: true,
      },
      FLE_DOLAR: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: true,
      },
      SEG_DOLAR: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: true,
      },
      CIF_DOLAR: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: true,
      },
      PESO_NETO: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: true,
      },
      PESO_BRUTO: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: true,
      },
      UNID_FIQTY: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: true,
      },
      UNID_FIDES: {
        type: DataTypes.STRING(5),
        allowNull: true,
      },
      DESC_COM: {
        type: DataTypes.STRING(10000),
        allowNull: true,
      },
      PUER_EMBAR: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      PUER_DESC: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      FECH_LLEGA: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      NUME_CORRE: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      NUME_SERIE: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      VIA_TRANSP: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      VIAT_DESC: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      SEST_MERCA: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      SEST_DESC: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      TIPO_DOCUM: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      LIBR_TRIBU: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      IMPORTADOR: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      CPAIS_PROC: {
        type: DataTypes.STRING(5),
        allowNull: true,
      },
      DPAIS_PROC: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: tableName,
      tableName: tableName,
      timestamps: false,
      freezeTableName: true,
    }
  )

  tables[tableName] = YearTable
}

export default tables
