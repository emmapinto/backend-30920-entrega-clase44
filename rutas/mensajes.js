import { connection } from '../controladores/mensajes.js'

const ioConnection = (io) => {
    io.on('connection', connection)
}

export default ioConnection