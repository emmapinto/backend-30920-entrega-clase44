import { Router } from 'express'
import { returnInfo } from '../controladores/info.js'

const router = Router()

router.get('/', returnInfo)

export default router