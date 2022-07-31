import axios from 'axios';

const BASE_URL = 'http://localhost:8080'

export const testProductsGet = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/products_api`)
        return response.data
    }
    catch(err) {
        return { failed: err.response.data || err }
    }
}

export const testProductCreate = async () => {
    try {
        const response = await axios.post(`${BASE_URL}/products_api`, {
            nombre: 'Producto de prueba',
            precio: 548,
            foto: 'https://place-hold.it/200x200'
        })
        return response.data
    }
    catch(err) {
        return { failed: err.response.data || err }
    }
}

export const testProductEdit = async (id) => {
    try {
        const response = await axios.put(`${BASE_URL}/products_api/${id}`, {
            nombre: 'Este producto fue editado',
            precio: 0,
            foto: 'Sin foto'
        })
        return response.data
    }
    catch(err) {
        return { failed: err.response.data || err }
    }
}

export const testProductDelete = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/products_api/${id}`)
        return response.data
    }
    catch(err) {
        return { failed: err.response.data || err }
    }
}