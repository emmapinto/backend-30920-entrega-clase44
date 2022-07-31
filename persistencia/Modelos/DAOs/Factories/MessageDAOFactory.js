import MessageFirebaseDAO from '../Messages/messagesFirebase.js'
import MessageMongoDAO from '../Messages/messagesMongo.js'
import MessageMemDAO from '../Messages/messagesMem.js'
import { variables } from '../../../../config.js'

let messageDAO

switch(variables.TIPO_PERSISTENCIA) {
    case 'firebase':
        messageDAO = new MessageFirebaseDAO()
        break
    case 'mongo':
        messageDAO = new MessageMongoDAO()
        break
    case 'memory':
    default:
        messageDAO = new MessageMemDAO()
}
export const getMessageDAO = () => {
    return messageDAO
}