import UserDAO from './users.js'
import { checkPassword, encrypt } from '../../../../utils/passwordEncryption.js'
import UserDTO from '../../../DTOs/userDTO.js'
import FirebaseClient from '../firebaseClient.js';

class UserFirebaseDAO extends UserDAO {
    constructor() {
        super()
        this.client = new FirebaseClient()
        ;( async () => {
            await this.client.connect()
            this.query = this.client.db.collection('users')
        })()
    }
    async getNewId() {
        try {
            const querySnapshot = await this.query.get()
            const docs = querySnapshot.docs
            let newID = 0
            for(let item of docs) {
                if(Number(item.id) >= newID){
                    newID = Number(item.id)+1
                }
            }
            return newID
        } catch(err) {
            throw new Error(`Error al generar un nuevo id: ${err.message}`)
        }
    }
    async getUser(id) {
        try {
            const doc = this.query.doc(`${id}`)
            const user = await doc.get()
            if(!user.data()) return null
            return new UserDTO(user.id, user.data())
        }
        catch(err) {
            throw new Error(`Failed to get user: ${err}`)
        }
    }
    async authorize(email, password) {
        try {
            const userQuery = await this.query.where('email', '==', email).get()
            if(userQuery.empty) return null
            const user = userQuery.docs[0]
            if(!checkPassword(user.data().password, password)) return null
            return new UserDTO(user.id, user.data())
        }
        catch(err) {
            throw new Error(`Failed to authorize user: ${err}`)
        }
    }
    async register(email, password) {
        try {
            const userQuery = await this.query.where('email', '==', email).get()
            if(!userQuery.empty) throw new Error('User already exists')
            const encryptedPassword = encrypt(password)
            const id = await this.getNewId()
            const doc = this.query.doc(`${id}`)
            const newUser = { id: id, email: email, password: encryptedPassword }
            await doc.create(newUser)
            return new UserDTO(newUser.id, newUser)
        }
        catch(err) {
            throw new Error(`Failed to register user: ${err}`)
        }
    }
}

export default UserFirebaseDAO