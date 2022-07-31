export const home = (req, res) => {
    res.render('main.hbs', {username: req.user.email})
}
export const login = (req, res) => {
    if(req.isAuthenticated()) {
        return res.render('main.hbs', {username: req.user.email})
    }
    res.render('login.hbs')
}
export const register = (req, res) => {
    if(req.isAuthenticated()) {
        return res.render('main.hbs', {username: req.user.email})
    }
    res.render('register.hbs')
}
export const logout = (req, res) => {
    res.render('logout.hbs', {username: req.user.email})
    req.logout()
}
export const checkAuth = (req, res, next) => {
    if(!req.isAuthenticated()) {
        return res.redirect('/login')
    }
    next()
}