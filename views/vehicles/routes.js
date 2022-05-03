import express from 'express'
import { getDataBase } from '../../db/db.js';

const vehicleRoutes = express.Router();

vehicleRoutes.route("/vehicles").get((req, res) => {
    console.log("Están intentando ingresar a /vehicles");
    const dataBase = getDataBase();
    dataBase.collection('vehicle').find({}).toArray((err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error")
        } else {
            res.json(result)
        }
    })
})

vehicleRoutes.route("/vehicle/create").post((req, res) => {
    const vehicle = req.body;
    if (Object.keys(vehicle).includes("vehName") &&
        Object.keys(vehicle).includes("vehBrand") &&
        Object.keys(vehicle).includes("vehModel")
    ) {
        const dataBase = getDataBase();
        dataBase.collection('vehicle').insertOne(vehicle, (err, result) => {
            if (err) {
                console.error(err);
                res.sendStatus(500)
            } else {
                console.log(result);
                res.sendStatus(200)
            }
        })
    } else {
        res.sendStatus(500)
    }
})

vehicleRoutes.route("/vehicle/edit").patch((req, res) => {
    const dataToEdit = req.body;
    console.log(dataToEdit);
    const selectedVehicle = { _id: new ObjectId(dataToEdit.id) }
    delete dataToEdit.id
    const operation = {
        $set: dataToEdit,
    }
    const dataBase = getDataBase();
    dataBase.collection('vehicle')
        .findOneAndUpdate(
            selectedVehicle,
            operation,
            { upsert: true, returnOriginal: true },
            (err, result) => {
                if (err) {
                    console.error("Error trying to update vehicle", err);
                    res.sendStatus(500)
                } else {
                    console.log("Successful update");
                    res.sendStatus(200)
                }
            })
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