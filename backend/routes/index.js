import express from 'express'

import loginRouter from './login.js'
import usersRouter from './users.js'
import importRouter from './import.js'

import auth from '../middlewares/auth.js'

const router = express.Router()

router.use('/login', loginRouter)
router.use('/users', usersRouter)
router.use('/import', auth, importRouter)

export default router
