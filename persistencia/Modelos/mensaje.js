import mongoose from 'mongoose'

const schemaMensaje =  new mongoose.Schema({
    text: String,
    author: Object
})

const Mensaje = mongoose.model('mensajes', schemaMensaje)

export default Mensaje