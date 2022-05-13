import { getDataBase } from "../../db/db.js";
import { ObjectId } from 'mongodb'

const getAllSales = async (callback) => {
    const dataBase = getDataBase();
    await dataBase.collection('sales').find({}).toArray(callback)
}

const getSale = async (id, callback) => {
    const dataBase = getDataBase();
    await dataBase.collection('sales').findOne({ _id: new ObjectId(id) }, callback);
}

const createOneSale = async (vehicleToCreate, callback) => {
    const dataBase = getDataBase();
    await dataBase.collection('sales').insertOne(vehicleToCreate, callback)
}

const editOneSaleParams = async (id, dataToEdit, callback) => {
    const selectedSale = { _id: new ObjectId(id) }
    const operation = {
        $set: dataToEdit,
    }
    const dataBase = getDataBase();
    await dataBase.collection('sales')
        .findOneAndUpdate(
            selectedSale,
            operation,
            { returnOriginal: true },
            callback)
}


const deleteOneSaleParams = async (id, callback) => {
    const selectedSale = { _id: new ObjectId(id) }
    const dataBase = getDataBase();
    await dataBase.collection('sales').deleteOne(selectedSale, callback)
}

export { getAllSales, createOneSale, editOneSaleParams, deleteOneSaleParams, getSale }