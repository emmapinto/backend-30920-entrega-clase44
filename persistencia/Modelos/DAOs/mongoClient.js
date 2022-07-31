import DBClient from './db.js'
import mongoose from 'mongoose'
import 'dotenv/config'

class MongoClient extends DBClient {
    constructor() {
        super()
        this.client = mongoose
    }
    async connect() {
        try {
            this.client.connect(process.env.MONGO_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            this.connected = true
            console.log('Connected to MongoDB')
        }
        catch(err) {
            throw new Error(`Error al conectar con MongoDB: ${err}`)
        }
    }
    async disconnect() {
        try {
            this.client.connection.close()
            this.connected = false
            console.log('Disconnected from MongoDB')
        }
        catch(err) {
            throw new Error(`Error al desconectar con MongoDB: ${err}`)
        }
    }
}

export default MongoClient