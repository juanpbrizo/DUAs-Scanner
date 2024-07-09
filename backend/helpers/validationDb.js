const validationDb = async (schema, model, match) => {
  try {
    const response = await model.findOne(schema)
    if (match) {
      if (!response) {
        return null
      }
      return response
    } else {
      if (response) {
        return null
      }
      return true
    }
  } catch (error) {
    throw { message: 'Error general, comuníquese con el administrador', code: 500 }
  }
}

export default validationDb
