import ProductDAO from "./products.js"
import FirebaseClient from "../firebaseClient.js"
import ProductDTO from '../../../DTOs/productDTO.js'

class ProductFirebaseDAO extends ProductDAO {
    constructor() {
        super()
        this.client = new FirebaseClient()
        ;( async () => {
            await this.client.connect()
            this.query = this.client.db.collection('products')
        })()
    }

    async getNewId() {
        try {
            const querySnapshot = await this.query.get()
            const docs = querySnapshot.docs
            let newID = 0
            for(let item of docs) {
                if(Number(item.id) >= newID){
                    newID = Number(item.id)+1
                }
            }
            return newID
        } catch(err) {
            throw new Error(`Error al generar un nuevo id: ${err.message}`)
        }
    }

    async add(product) {
        try {
            const id = await this.getNewId()
            const doc = this.query.doc(`${id}`)
            product.id = id
            await doc.create(product)
            const nuevoproduct = await doc.get()
            return new ProductDTO(id, nuevoproduct.data())
        } catch(err) {
            throw new Error(`Error al guardar un nuevo producto: ${err.message}`)
        }
    }
    async getAll() {
        try {
            const querySnapshot = await this.query.get()
            const docs = querySnapshot.docs
            if(docs.length === 0) return []
            return docs.map(doc => (
                new ProductDTO(doc.id, doc.data())
            ))
        } catch(err) {
            throw new Error(`Error al obtener productos: ${err.message}`)
        }
    }
    async getById(id) {
        try {
            const doc = this.query.doc(`${id}`)
            const product = await doc.get()
            if(!product.data()) throw new Error('Producto no encontrado')
            return new ProductDTO(id, product.data())
        } catch(err) {
            throw new Error(`Error al obtener producto: ${err.message}`)
        }
    }
    async deleteById(id) {
        try {
            const doc = this.query.doc(`${id}`)
            const deleted = await doc.delete()
            if(!deleted) throw new Error('Producto no encontrado')
            return true
        } catch(err) {
            throw new Error(`Error al eliminar producto: ${err.message}`)
        }
    }
    async deleteAll() {
        try {
            const querySnapshot = await this.query.get()
            const docs = querySnapshot.docs
            const batch = this.client.db.batch()
            docs.forEach(doc => {
                batch.delete(doc.ref)
            })
            await batch.commit()
            return true
        }
        catch(err) {
            throw new Error(`Error al eliminar productos: ${err.message}`)
        }
    }
    async updateById(id, product) {
        try {
            const doc = this.query.doc(`${id}`)
            const updated = await doc.update(product)
            if(!updated) throw new Error('Producto no encontrado')
            const edited = await doc.get()
            return new ProductDTO(id, edited.data())
        } catch(err) {
            throw new Error(`Error al actualizar producto: ${err.message}`)
        }
    }
}

export default ProductFirebaseDAO