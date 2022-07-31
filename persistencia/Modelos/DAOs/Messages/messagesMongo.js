import MessageDAO from './messages.js'
import MongoClient from '../mongoClient.js'
import Mensaje from '../../mensaje.js'
import MessageDTO from '../../../DTOs/messageDTO.js'

class MessagesMongoDAO extends MessageDAO {
    constructor() {
        super()
        this.client = new MongoClient()
        this.client.connect()
    }
    async getAll() {
        try {
            const messages = await Mensaje.find().lean()
            if(messages.length === 0) return []
            return messages.map(message => new MessageDTO(message._id, message))
        }
        catch(err) {
            throw new Error(`Error al obtener mensajes: ${err.message}`)
        }
    }
    async add(message) {
        try {
            const newMessage = new Mensaje(message)
            const savedMessage = await newMessage.save()
            console.log(savedMessage)
            return new MessageDTO(`${savedMessage._id}`, savedMessage)
        }
        catch(err) {
            throw new Error(`Error al añadir mensajes: ${err.message}`)
        }
    }
    async deleteAll() {
        try {
            await Mensaje.deleteMany({})
            return true
        }
        catch(err) {
            throw new Error(`Error al eliminar mensajes: ${err.message}`)
        }
    }
}

export default MessagesMongoDAO