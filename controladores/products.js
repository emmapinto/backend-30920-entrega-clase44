import log4js from 'log4js'
import { generateMockProducts, fetchProducts, addProduct, updateProduct, removeProduct } from '../logica/productos.js'

export const returnTestProducts = async (req, res) => {
    try {
        const prods = generateMockProducts(5)
        res.json(prods)
    } catch(err) {
        let logger = log4js.getLogger('errores')
        logger.error(err)
        res.status(500).send({ error: err.message })
    }
}

export const returnProducts = async (req, res) => {
    try {
        const payload = await fetchProducts(req.params.id)
        res.send(payload)
    }
    catch(err) {
        let logger = log4js.getLogger('errores')
        logger.error(err)
        res.status(500).send({ error: err.message })
    }
}
export const createProduct = async (req, res) => {
    try {
        const productData = req.body
        const payload = await addProduct({productData})
        res.send(payload)
    }
    catch(err) {
        let logger = log4js.getLogger('errores')
        logger.error(err)
        res.status(500).send({ error: err.message })
    }
}
export const editProduct = async (req, res) => {
    try {
        const productData = req.body
        const payload = await updateProduct({id: req.params.id, productData})
        res.send(payload)
    }
    catch(err) {
        let logger = log4js.getLogger('errores')
        logger.error(err)
        res.status(500).send({ error: err.message })
    }
}
export const deleteProduct = async (req, res) => {
    try {
        const payload = await removeProduct({id: req.params.id})
        res.send(payload)
    }
    catch(err) {
        let logger = log4js.getLogger('errores')
        logger.error(err)
        res.status(500).send({ error: err.message })
    }
}