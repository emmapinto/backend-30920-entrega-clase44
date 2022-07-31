import BaseMemoriaDAO from '../memoria.js';
import { checkPassword, encrypt } from '../../../../utils/passwordEncryption.js'
import UserDTO from '../../../DTOs/userDTO.js'

class UserMemDAO extends BaseMemoriaDAO {
    constructor() {
        super()
        this.users = []
    }
    async getUser(id) {
        try {
            const userIndex = this.getIndex(id, this.users)
            if(userIndex === -1) return null
            const user = this.users[userIndex]
            return new UserDTO(user._id, user)
        }
        catch(err) {
            throw new Error(`Failed to get user: ${err}`)
        }
    }
    async authorize(email, password) {
        try {
            const user = this.users.find(user => user.email === email)
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
            const user = this.users.find(user => user.email === email)
            if(user) throw new Error('User already exists')
            const encryptedPassword = encrypt(password)
            let newId = this.getNext_id(this.users)
            const newUser = {
                _id: newId,
                email: email,
                password: encryptedPassword
            }
            this.users = [...this.users, newUser]
            return new UserDTO(newUser._id, newUser)
        }
        catch(err) {
            throw new Error(`Failed to register user: ${err}`)
        }
    }
}

export default UserMemDAO