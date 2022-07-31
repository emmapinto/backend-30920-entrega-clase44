import { Router } from 'express'
import { returnRandoms } from '../controladores/randoms.js'
const router = Router()

router.get('/randoms', returnRandoms)

export default router