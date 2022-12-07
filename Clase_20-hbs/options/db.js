const admin = require('firebase-admin')
const serviceAccount = require('../../Clase_20-hbs/firebase.config.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

const db = admin.firestore()
const ProductsDB = db.collection('productos')
const CarritoDB = db.collection('carritos')
const ChatDB = db.collection('chat')

module.exports = {ProductsDB, CarritoDB, ChatDB}