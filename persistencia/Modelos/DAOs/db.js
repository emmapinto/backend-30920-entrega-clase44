class DBClient {
    constructor() {
        this.connected = false
    }
    async connect() {
        throw new Error('Not implemented')
    }
    async disconnect() {
        throw new Error('Not implemented')
    }
}
export default DBClient