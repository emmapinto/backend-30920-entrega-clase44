import DBClient from "./db.js";
import admin from 'firebase-admin'
import { firebaseData } from '../../../config.js'

class FirebaseClient extends DBClient {
    constructor() {
        super()
    }

    static admin = admin.initializeApp({
        credential: admin.credential.cert(firebaseData),
        databaseURL: "https://coder-backend-ecommerce-eda88.firebaseio.com"
      });

    async connect() {
        try {
            this.db = admin.firestore()
            this.connected = true
            console.log('Connected to Firebase')
        }
        catch(err) {
            throw new Error(`Error al conectar con Firebase: ${err}`)
        }
    }
    async disconnect() {
        try {
            this.db.terminate()
            this.connected = false
        }
        catch(err) {
            throw new Error(`Error al desconectar con Firebase: ${err}`)
        }
    }
}

export default FirebaseClient