import MessageDAO from "./messages.js"
import FirebaseClient from "../firebaseClient.js"
import MessageDTO from '../../../DTOs/messageDTO.js'

class MessageFirebaseDAO extends MessageDAO {
    constructor() {
        super()
        this.client = new FirebaseClient()
        ;( async () => {
            await this.client.connect()
            this.query = this.client.db.collection('mensajes')
        })();
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
    async getAll() {
        try {
            const querySnapshot = await this.query.get()
            const docs = querySnapshot.docs
            if(docs.length === 0) return []
            return docs.map(doc => (
                new MessageDTO(doc.id, doc.data())
            ))
        } catch(err) {
            throw new Error(`Error al obtener mensajes: ${err.message}`)
        }
    }
    async add(message) {
        try {
            const id = await this.getNewId()
            const doc = this.query.doc(`${id}`)
            message.id = id
            await doc.create(message)
            const nuevoMessage = await doc.get()
            return new MessageDTO(id, nuevoMessage.data())
        } catch(err) {
            throw new Error(`Error al guardar un nuevo mensaje: ${err.message}`)
        }
    }
    async deleteAll() {
        try {
            const querySnapshot = await this.query.get()
            const docs = querySnapshot.docs
            const batch = this.client.db.batch()
            docs.forEach(doc => {
                batch.delete(doc.ref)
            })
            await batch.commit()
            return true
        }
        catch(err) {
            throw new Error(`Error al eliminar mensajes: ${err.message}`)
        }
    }
}

export default MessageFirebaseDAO