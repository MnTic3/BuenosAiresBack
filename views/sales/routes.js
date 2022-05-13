import express from 'express'
import { createOneSale, deleteOneSaleParams, editOneSaleParams, getAllSales, getSale } from '../../controllers/sales/controller.js';


const saleRoutes = express.Router();

const genericCallBack = (res) => (err, result) => {
    if (err) {
        res.sendStatus(500)
    } else {
        res.json(result)
    }
}

saleRoutes.route("/sales/").get((req, res) => {
    getAllSales(genericCallBack(res))
})

saleRoutes.route("/sales/:id").get((req, res) => {
    getSale(req.params.id, genericCallBack(res))
})

saleRoutes.route("/sales/").post((req, res) => {
    createOneSale(req.body, genericCallBack(res))
})

saleRoutes.route("/sales/:id/").patch((req, res) => {
    editOneSaleParams(req.params.id, req.body, genericCallBack(res))
})

saleRoutes.route("/sales/:id/").delete((req, res) => {
    deleteOneSaleParams(req.params.id, genericCallBack(res))
})

export default saleRoutes;