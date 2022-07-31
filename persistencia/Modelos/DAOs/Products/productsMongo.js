import ProductDTO from '../../../DTOs/productDTO.js'
import MongoClient from '../mongoClient.js'
import ProductDAO from './products.js'
import Producto from '../../producto.js'

class ProductsMongoDAO extends ProductDAO {
    constructor() {
        super()
        this.client = new MongoClient()
        this.client.connect()
    }
    async getAll() {
        try {
            const products = await Producto.find().lean()
            if(products.length === 0) return []
            return products.map(product => new ProductDTO(product._id, product))
        }
        catch(err) {
            throw new Error(`Error al obtener productos: ${err.message}`)
        }
    }
    async getById(id) {
        try {
            const product = await Producto.findById(id).lean()
            if(!product) throw new Error('Producto no encontrado')
            return new ProductDTO(product._id, product)
        }
        catch(err) {
            throw new Error(`Error al obtener producto: ${err.message}`)
        }
    }
    async add(product) {
        try {
            const newProduct = new Producto(product)
            const savedProduct = await newProduct.save()
            return new ProductDTO(savedProduct._id, savedProduct)
        }
        catch(err) {
            throw new Error(`Error al añadir producto: ${err.message}`)
        }
    }
    async deleteById(id) {
        try {
            const deleted = await Producto.findByIdAndDelete(id)
            if(!deleted) throw new Error('Producto inexistente')
            return true
        }
        catch(err) {
            throw new Error(` ${err.message}`)
        }
    }
    async deleteAll() {
        try {
            await Producto.deleteMany({})
            return true
        }
        catch(err) {
            throw new Error(`Error al eliminar productos: ${err.message}`)
        }
    }
    async updateById(id, product) {
        try {
            const updatedProduct = await Producto.findByIdAndUpdate(id, product)
            if(!updatedProduct) throw new Error('Producto inexistente')
            return new ProductDTO(updatedProduct._id, updatedProduct)
        }
        catch(err) {
            throw new Error(`Error al editar producto: ${err.message}`)
        }
    }
}

export default ProductsMongoDAO