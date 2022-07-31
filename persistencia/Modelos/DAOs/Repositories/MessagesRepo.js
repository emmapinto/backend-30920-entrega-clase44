import { getMessageDAO } from "../Factories/MessageDAOFactory.js"

class MessageRepo {
    constructor() {
        this.dao = getMessageDAO()
    }
    async getAll() {
        const dtos = await this.dao.getAll()
        return dtos
    }
    async send(message) {
        await this.dao.add(message)
        const dtos = await this.dao.getAll()
        return dtos
    }
}

export default MessageRepo