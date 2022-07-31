export const postLogin = (req, res) => {
    return res.redirect('/')
}
export const postRegister = (req, res) => {
    return res.redirect('/login')
}
export const loginFail = (req, res) => {
    res.render('user_error.hbs', {error: 'login'})
}
export const registerFail = (req, res) => {
    res.render('user_error.hbs', {error: 'register'})
}