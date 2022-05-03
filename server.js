//traditional method
//const express = require('express');

import express from "express";
import { MongoClient, ObjectId } from 'mongodb'
import cors from 'cors'
import dotenv from 'dotenv'


dotenv.config({path: './.env'})

const stringConnection = process.env.DATABASE_URL
const mongoClient = new MongoClient(stringConnection, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const app = express()
app.use(express.json())
app.use(cors())
let dataBase;

app.get("/vehicles", (req, res) => {
    console.log("Están intentando ingresar a /vehicles");
    dataBase.collection('vehicle').find({}).toArray((err, result) => {
        if(err){
            console.error(err);
            res.status(500).send("Error")
        }else{
            res.json(result)
        }
    })
})


app.post("/vehicle/create", (req, res) => {
    const vehicle = req.body;
    if (Object.keys(vehicle).includes("vehName") &&
        Object.keys(vehicle).includes("vehBrand") &&
        Object.keys(vehicle).includes("vehModel")
    ) {
        dataBase.collection('vehicle').insertOne(vehicle, (err, result)=>{
            if (err) {
                console.error(err);
                res.sendStatus(500)
            }else{
                console.log(result);
                res.sendStatus(200)
            }
        })
    } else {
        res.sendStatus(500)
    }
})

app.patch("/vehicle/edit", (req, res) => {
    const dataToEdit = req.body;
    console.log(dataToEdit);
    const selectedVehicle = {_id: new ObjectId(dataToEdit.id) }
    delete dataToEdit.id
    const operation = {
        $set: dataToEdit,
    }
    dataBase.collection('vehicle')
    .findOneAndUpdate(
        selectedVehicle,
        operation,
        {upsert: true, returnOriginal: true}, 
        (err, result)=>{
        if (err) {
            console.error("Error trying to update vehicle", err);
            res.sendStatus(500)
        }else{
            console.log("Successful update");
            res.sendStatus(200)
        }
    })
})

app.delete("/vehicle/delete", (req, res)=>{
    const selectedVehicle = {_id: new ObjectId(req.body.id)}
    dataBase.collection('vehicle').deleteOne(selectedVehicle, (err, result)=>{
        if (err) {
            console.error(err);
            res.sendStatus(500)
        }else{
            res.sendStatus(200)
        }
    })
})

const main = () => {
    mongoClient.connect((err, db) => {
        if (err) {
            console.error(err)
        }
        dataBase = db.db('concesionario')
        console.log("conexión exitosa");
        return app.listen(process.env.PORT, () => {
            console.log(`Listening ${process.env.PORT}`);
        })
    })
}

main();