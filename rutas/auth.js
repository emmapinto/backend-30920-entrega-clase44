import { Router } from 'express'
import { home, login, register, logout, checkAuth } from '../controladores/auth.js' 

const router = Router()

router.get('/', checkAuth, home)
router.get('/login', login)
router.get('/register', register)
router.get('/logout', checkAuth, logout)

export default router