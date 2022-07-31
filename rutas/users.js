import { Router } from 'express'
import '../logica/users.js'
import passport from 'passport'
import { postLogin, postRegister, loginFail, registerFail } from '../controladores/users.js'

const router = Router()

router.post('/register', passport.authenticate('register', {failureRedirect: '/users/register-fail'}), postRegister)
router.post('/login', passport.authenticate('login', {failureRedirect: '/users/login-fail'}), postLogin)
router.get('/login-fail', loginFail)
router.get('/register-fail', registerFail)

export default router