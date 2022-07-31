import UserFirebaseDAO from '../Users/usersFirebase.js'
import UserMongoDAO from '../Users/usersMongo.js'
import UserMemDAO from '../Users/usersMem.js'
import { variables } from '../../../../config.js'

let userDAO

switch(variables.TIPO_PERSISTENCIA) {
    case 'firebase':
        userDAO = new UserFirebaseDAO()
        break
    case 'mongo':
        userDAO = new UserMongoDAO()
        break
    case 'memory':
    default:
        userDAO = new UserMemDAO()
}
                
export const getUserDAO = () => {
    return userDAO
}