import UserDAO from './users.js'
import { checkPassword, encrypt } from '../../../../utils/passwordEncryption.js'
import UserDTO from '../../../DTOs/userDTO.js'
import MongoClient from '../mongoClient.js';
import Usuario from '../../usuario.js';

class UserMongoDAO extends UserDAO {
    constructor() {
        super()
        this.client = new MongoClient()
        this.client.connect()
    }
    async getUser(id) {
        try {
            const user = await Usuario.findById(id)
            if(!user) return null
            return new UserDTO(user._id, user)
        }
        catch(err) {
            throw new Error(`Failed to get user: ${err}`)
        }
    }
    async authorize(email, password) {
        try {
            const user = await Usuario.findOne({ email: email })
            if(!user) return null
            if(!checkPassword(user.password, password)) return null
            return new UserDTO(user._id, user)
        }
        catch(err) {
            throw new Error(`Failed to authorize user: ${err}`)
        }
    }
    async register(email, password) {
        try {
            const user = await Usuario.findOne({ email: email })
            if(user) throw new Error('User already exists')
            const encryptedPassword = encrypt(password)
            const newUser = new Usuario({ email, password: encryptedPassword })
            await newUser.save()
            return new UserDTO(newUser._id, newUser)
        }
        catch(err) {
            throw new Error(`Failed to register user: ${err}`)
        }
    }
}

export default UserMongoDAO