import { testProductsGet, testProductCreate, testProductEdit, testProductDelete } from './clienteDePruebas.js'
import ProductRepo from '../persistencia/Modelos/DAOs/Repositories/ProductsRepo.js'

const products = new ProductRepo()

const decodeDTO = (dto) => {
    let res = {}
    Object.entries(dto).forEach(([key, value]) => {
        res[key] = value
    })
    return res
}

const pruebaGet = async () => {
    try {
        console.log('\n Obtener productos (GET): \n')
        const clientResponse = await testProductsGet()
        if(clientResponse.failed) return console.log('Error al obtener los productos: ', clientResponse.failed)
        const dbResponse = await products.getAll()
        let dbObj = null
        if(!dbResponse != []) {
            dbObj = dbResponse.map(obj => decodeDTO(obj))
        }
        console.log('CLIENT RESPONSE: \n', clientResponse)
        console.log('SERVER RESPONSE: \n', dbObj || dbResponse)
    }
    catch(err) {
        return console.log('Error durante la prueba: ', err)
    }
}

const pruebaPost = async () => {
    try {
        console.log('\n Crear producto (POST): \n')
        const clientResponse = await testProductCreate()
        if(clientResponse.failed) return console.log('Error al crear producto: ', clientResponse.failed)
        const checkWithDB = await products.getById(clientResponse.id)
        if(checkWithDB) {
            console.log(' ----> PRUEBA OK <----')
            return checkWithDB.id
        }
        console.log('CLIENT RESPONSE: \n', clientResponse)
        console.log('SERVER RESPONSE: \n', checkWithDB)
    }
    catch(err) {
        return console.log('Error durante la prueba: ', err)
    }
}

const pruebaPut = async (id) => {
    try {
        console.log('\n Editar producto (PUT): \n')
        const clientResponse = await testProductEdit(id)
        if(clientResponse.failed) return console.log('Error al editar producto: ', clientResponse.failed)
        const checkWithDB = await products.getById(clientResponse.id)
        console.log('CLIENT RESPONSE: \n', clientResponse)
        console.log('SERVER RESPONSE: \n', checkWithDB)
    }
    catch(err) {
        return console.log('Error durante la prueba: ', err)
    }
}

const safelyTryToGetDeleted = async (id) => {
    try {
        const checkWithDB = await products.getById(id)
        return checkWithDB
    }
    catch(err) {
        return `Failed to obtain product --> ${err.message}`
    }
} 

const pruebaDelete = async (id) => {
    try {
        console.log('\n Eliminar producto (DELETE): \n')
        const clientResponse = await testProductDelete(id)
        if(clientResponse.failed) return console.log('Error al editar producto: ', clientResponse.failed)
        const serverResponse = await safelyTryToGetDeleted(id)
        console.log('CLIENT RESPONSE: \n', clientResponse)
        console.log('SERVER RESPONSE: \n', serverResponse)
    }
    catch(err) {
        return console.log('Error durante la prueba: ', err)
    }
}

const realizarPruebas = async () => {
    console.log(' ----------------------------------------------------- ')
    console.log('\n --- Comenzando pruebas con el cliente de pruebas --- \n')
    console.log(' ----------------------------------------------------- ')
    //
    await pruebaGet()
    console.log(' \n---- Prueba de GET finalizada ----\n')
    //
    const id = await pruebaPost()
    console.log(' \n---- Prueba de POST finalizada ---- \n')
    //
    if(!id) return console.log('---> Suspendiendo pruebas por falta de ID <---')
    //
    await pruebaPut(id)
    console.log(' \n---- Prueba de PUT finalizada ---- \n')
    //
    await pruebaDelete(id)
    console.log(' \n---- Prueba de DELETE finalizada ---- \n')
    //
    console.log(' ----------------------------------------------------- ')
    console.log('\n --------------- PRUEBAS FINALIZADAS --------------- \n')
    console.log(' ----------------------------------------------------- ')
}

export default realizarPruebas