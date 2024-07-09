import { Router } from 'express'
import { postImport, getImport } from '../controllers/import.js'

const router = Router()

router.get('/', getImport)
router.post('/', postImport)

export default router
