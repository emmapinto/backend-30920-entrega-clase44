import { getProductDAO } from '../Factories/ProductDAOFactory.js'

class ProductRepo {
    constructor() {
        this.dao = getProductDAO()
    }
    async getAll() {
        const dtos = await this.dao.getAll()
        return dtos
    }
    async getById(id) {
        const dtos = await this.dao.getById(id)
        return dtos
    }
    async add(product) {
        const dtos = await this.dao.add(product)
        return dtos
    }
    async deleteById(id) {
        const done = await this.dao.deleteById(id)
        return done
    }
    async deleteAll() {
        const done = await this.dao.deleteAll()
        return done
    }
    async updateById(id, product) {
        const dtos = await this.dao.updateById(id, product)
        return dtos
    }
}

export default ProductRepo