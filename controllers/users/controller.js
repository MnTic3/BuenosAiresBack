import { getDataBase } from "../../db/db.js";
import { ObjectId } from 'mongodb'

const getAllUsers = async (callback) => {
    const dataBase = getDataBase();
    await dataBase.collection('users').find({}).toArray(callback)
}

const getUser = async (id, callback) => {
    const dataBase = getDataBase();
    await dataBase.collection('users').findOne({ _id: new ObjectId(id) }, callback);
}

const createOneUser = async (userToCreate, callback) => {
    const dataBase = getDataBase();
    await dataBase.collection('users').insertOne(userToCreate, callback)
}

const editOneUserParams = async (id, dataToEdit, callback) => {
    const selectedUser = { _id: new ObjectId(id) }
    const operation = {
        $set: dataToEdit,
    }
    const dataBase = getDataBase();
    await dataBase.collection('users')
        .findOneAndUpdate(
            selectedUser,
            operation,
            { returnOriginal: true },
            callback)
}


const deleteOneUserParams = async (id, callback) => {
    const selectedUser = { _id: new ObjectId(id) }
    const dataBase = getDataBase();
    await dataBase.collection('users').deleteOne(selectedUser, callback)
}

export { getAllUsers, createOneUser, editOneUserParams, deleteOneUserParams, getUser }
