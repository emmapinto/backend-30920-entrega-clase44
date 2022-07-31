import BaseMemoriaDao from '../memoria.js'
import MessageDTO from '../../../DTOs/messageDTO.js'

class MessageMemDAO extends BaseMemoriaDao {
    constructor() {
        super()
        this.messages = []
    }
    async getAll() {
        if(this.messages.length === 0) return []
        return this.messages.map(message => new MessageDTO(message._id, message))
    }
    async add(message) {
        let newId = this.getNext_id(this.messages)
        this.messages = [...this.messages, {...message, _id: newId}]
        const result = this.messages[this.messages.length - 1]
        return new MessageDTO(result._id, result)
    }
    async deleteAll() {
        this.messages = []
        return true
    }
}

export default MessageMemDAO