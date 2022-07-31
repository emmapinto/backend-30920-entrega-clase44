import ProductFirebaseDAO from '../Products/productsFirebase.js'
import ProductMongoDAO from '../Products/productsMongo.js'
import ProductMemDAO from '../Products/productsMem.js'
import { variables } from '../../../../config.js'

let productDAO

switch(variables.TIPO_PERSISTENCIA) {
    case 'firebase':
        productDAO = new ProductFirebaseDAO()
        break
    case 'mongo':
        productDAO = new ProductMongoDAO()
        break
    case 'memory':
    default:
        productDAO = new ProductMemDAO()
}
                
export const getProductDAO = () => {
    return productDAO
}