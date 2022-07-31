import { getInfo } from '../logica/info.js'

export const returnInfo = (req, res) => {
    const info = getInfo()
    res.render('info.hbs', info)
}