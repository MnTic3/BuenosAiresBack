import express from 'express'
import { createOneVehicle, deleteOneVehicleParams,  editOneVehicleParams, getAllVehicles } from '../../controllers/vehicles/controller.js';


const vehicleRoutes = express.Router();

//Normal
const genericCallBack = (res) => {
    return (err, result) => {
        if (err) {
            res.sendStatus(500)
        } else {
            res.json(result)
        }
    }
}
/*
//Simplication
const genericCallBack = (res) => (err, result) => {
    if (err) {
        res.sendStatus(500)
    } else {
        res.json(result)
    }
}
*/


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

vehicleRoutes.route("/vehicles").post((req, res) => {
    createOneVehicle(req.body, genericCallBack(res))
})

//id in the body
// vehicleRoutes.route("/vehicle/edit").patch((req, res) => {
//     editOneVehicle(req.body, genericCallBack(res))
// })

/*id in the url*/
vehicleRoutes.route("/vehicles/:id").patch((req, res) => {
    editOneVehicleParams(req.params.id, req.body, genericCallBack(res))
})

//id in the body
// vehicleRoutes.route("/vehicle/delete").delete((req, res) => {
//     deleteOneVehicle(req.body, genericCallBack(res))
// })

/*id in the url*/
vehicleRoutes.route("/vehicles/:id").delete((req, res) => {
    deleteOneVehicleParams(req.params.id, genericCallBack(res))
})

export default vehicleRoutes;