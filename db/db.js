import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'

dotenv.config({ path: "./.env" })


const stringConnection = process.env.DATABASE_URL

const mongoClient = new MongoClient(stringConnection, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

let dataBase;

const dbConnection = (callback) => {
    mongoClient.connect((err, db) => {
        if (err) {
            console.error(err);
            return 'error'
        } else {
            dataBase = db.db('concesionario')
            return callback();
        }
    })
}

const getDataBase = () => {
    return dataBase;
}

export {dbConnection, getDataBase}