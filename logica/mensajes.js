import normalizar from '../utils/normalizacion.js'
import MessageRepo from '../persistencia/Modelos/DAOs/Repositories/MessagesRepo.js'

const messages = new MessageRepo()

export const emitMessages = async (socket) => {
    const msjs = await messages.getAll()
    return socket.emit('messageBoard', normalizar(msjs))
}

export const saveNewMessage = async (msg, socket) => {
    const msjs = await messages.send(msg)
    return socket.emit('messageBoard', normalizar(msjs))
}