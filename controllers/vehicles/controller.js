import { getDataBase } from "../../db/db.js";


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

export { getAllVehicles, createOneVehicle }