import { Router } from 'express'
import { getUsers, putUsers, postUsers, putPassword } from '../controllers/users.js'

import auth from '../middlewares/auth.js'

const router = Router()

router.get('/', auth, getUsers)
router.put('/', auth, putUsers)
router.post('/', auth, postUsers)

router.put('/password/:uid', putPassword)

export default router
