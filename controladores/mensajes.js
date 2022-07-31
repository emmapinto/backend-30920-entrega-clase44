import log4js from 'log4js'
import { emitMessages, saveNewMessage } from '../logica/mensajes.js'

export const connection = async socket => {
    try {
        console.log(`User connected with socket id: ${socket.id}`)
        await emitMessages(socket)
        socket.on('userMessage', async (msg) => {
            await saveNewMessage(msg, socket)
        })
    } catch(err) {
        let logger = log4js.getLogger('errores')
        logger.error(err)
    }
}