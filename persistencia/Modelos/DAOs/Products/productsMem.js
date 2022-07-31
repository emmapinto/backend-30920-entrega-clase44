import BaseMemoriaDAO from "../memoria.js"
import ProductDTO from '../../../DTOs/productDTO.js'

class ProductsMemDAO extends BaseMemoriaDAO {
    constructor() {
        super()
        this.products = []
    }
    async getAll() {
        if(this.products.length === 0) return []
        return this.products.map(product => new ProductDTO(product._id, product))
    }
    async getById(id) {
        let index = this.getIndex(id, this.products)
        if(index === -1) throw new Error(`No existe el producto con id ${id}`)
        const result = this.products[index]
        return new ProductDTO(result._id, result)
    }
    async add(product) {
        const newId = this.getNext_id(this.products)
        this.products = [...this.products, {...product, _id: newId}]
        const result = this.products[this.products.length - 1]
        return new ProductDTO(result._id, result)
    }
    async deleteById(id) {
        let index = this.getIndex(id, this.products)
        if(index === -1) throw new Error(`No existe el producto con id ${id}`)
        this.products.splice(index, 1)
        return true
    }
    async deleteAll() {
        this.products = []
        return true
    }
    async updateById(id, product) {
        let index = this.getIndex(id, this.products)
        if(index === -1) throw new Error(`No existe el producto con id ${id}`)
        Object.entries(product).forEach(([key, value]) => {
            this.products[index][key] = value
        })
        const result = this.products[index]
        return new ProductDTO(result._id, result)
    }
}

export default ProductsMemDAO