import { getDataBase } from "../../db/db.js";
import { ObjectId } from 'mongodb'

const getAllVehicles = async (callback) => {
    const dataBase = getDataBase();
    await dataBase.collection('vehicle').find({}).toArray(callback)
}

const createOneVehicle = async (vehicleToCreate, callback) => {
    if (
        Object.keys(vehicleToCreate).includes("vehName") &&
        Object.keys(vehicleToCreate).includes("vehBrand") &&
        Object.keys(vehicleToCreate).includes("vehModel")
    ) {
        const dataBase = getDataBase();
        await dataBase.collection('vehicle').insertOne(vehicleToCreate, callback)
    } else {
        return "Error"
    }
}

const editOneVehicle = async (dataToEdit, callback) => {
    const selectedVehicle = { _id: new ObjectId(dataToEdit.id) }
    delete dataToEdit.id
    const operation = {
        $set: dataToEdit,
    }
    const dataBase = getDataBase();
    await dataBase.collection('vehicle')
        .findOneAndUpdate(
            selectedVehicle,
            operation,
            { upsert: true, returnOriginal: true },
            callback)
}

export { getAllVehicles, createOneVehicle, editOneVehicle }