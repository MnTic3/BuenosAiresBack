import express from 'express'
import { createOneVehicle, editOneVehicle, getAllVehicles } from '../../controllers/vehicles/controller.js';
import { getDataBase } from '../../db/db.js';


const vehicleRoutes = express.Router();

const genericCallBack = (res) => (err, result) => {
    if (err) {
        res.sendStatus(500)
    }else {
        res.json(result)
    }
}

vehicleRoutes.route("/vehicles").get((req, res) => {
    const responseGetAll = (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error")
        } else {
            res.json(result)
        }
    }
    getAllVehicles(responseGetAll)
})

vehicleRoutes.route("/vehicle/create").post((req, res) => {
    createOneVehicle(req.body,genericCallBack(res))
})

vehicleRoutes.route("/vehicle/edit").patch((req, res) => {
    editOneVehicle(req.body, genericCallBack(res))
})

vehicleRoutes.route("/vehicle/delete").delete((req, res) => {
    const selectedVehicle = { _id: new ObjectId(req.body.id) }
    const dataBase = getDataBase();
    dataBase.collection('vehicle').deleteOne(selectedVehicle, (err, result) => {
        if (err) {
            console.error(err);
            res.sendStatus(500)
        } else {
            res.sendStatus(200)
        }
    })
})

export default vehicleRoutes;