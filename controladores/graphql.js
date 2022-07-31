import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import { getAllProducts, addProduct, updateProduct, removeProduct } from '../logica/productos.js'

const schema = buildSchema(`
    type Producto {
        id: ID!,
        nombre: String,
        precio: Float,
        foto: String
    }
    input ProductoInput {
        nombre: String,
        precio: Float,
        foto: String
    }
    type Query {
        getAllProducts: [Producto],
    }
    type Mutation {
        addProduct(productData: ProductoInput): Producto,
        updateProduct(id: ID!, productData: ProductoInput): Producto,
        removeProduct(id: ID!): [Producto]
    }
`)

class ControladorGraphQl {
    constructor() {
        return graphqlHTTP({
            schema: schema,
            rootValue: {
                getAllProducts,
                addProduct,
                updateProduct,
                removeProduct
            },
            graphiql: true
        })
    }
}

export default ControladorGraphQl