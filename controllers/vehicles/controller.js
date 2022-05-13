import { getDataBase } from "../../db/db.js";
import { ObjectId } from 'mongodb'

const getAllVehicles = async (callback) => {
    const dataBase = getDataBase();
    await dataBase.collection('vehicle').find({}).toArray(callback)
}

const getVehicle = async (id, callback) => {
    const dataBase = getDataBase();
    await dataBase.collection('vehicle').findOne({ _id: new ObjectId(id) }, callback);
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

const editOneVehicleParams = async (id, dataToEdit, callback) => {
    const selectedVehicle = { _id: new ObjectId(id) }
    const operation = {
        $set: dataToEdit,
    }
    const dataBase = getDataBase();
    await dataBase.collection('vehicle')
        .findOneAndUpdate(
            selectedVehicle,
            operation,
            { returnOriginal: true },
            callback)
}


const deleteOneVehicleParams = async (id, callback) => {
    const selectedVehicle = { _id: new ObjectId(id) }
    const dataBase = getDataBase();
    await dataBase.collection('vehicle').deleteOne(selectedVehicle, callback)
}

export { getAllVehicles, createOneVehicle, editOneVehicleParams, deleteOneVehicleParams, getVehicle }

// const deleteOneVehicle = async (dataToDelete, callback) => {
//     const selectedVehicle = { _id: new ObjectId(dataToDelete.id) }
//     const dataBase = getDataBase();
//     await dataBase.collection('vehicle').deleteOne(selectedVehicle, callback)
// }

// const editOneVehicle = async (dataToEdit, callback) => {
//     console.log(dataToEdit.id);
//     const selectedVehicle = { _id: new ObjectId(dataToEdit.id) }
//     delete dataToEdit.id
//     const operation = {
//         $set: dataToEdit,
//     }
//     const dataBase = getDataBase();
//     await dataBase.collection('vehicle')
//         .findOneAndUpdate(
//             selectedVehicle,
//             operation,
//             { returnOriginal: true },
//             callback)
// }