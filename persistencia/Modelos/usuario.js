import mongoose from 'mongoose'

const schemaUsuario =  new mongoose.Schema({
    email: String,
    password: String
})

const Usuario = mongoose.model('usuarios', schemaUsuario)

export default Usuario