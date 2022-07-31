import mongoose from 'mongoose'

const schemaProducto =  new mongoose.Schema({
    nombre: String,
    precio: Number,
    foto: String
})

const Producto = mongoose.model('productos', schemaProducto)

export default Producto