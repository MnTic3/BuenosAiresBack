//traditional method
//const express = require('express');
import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv'
import { dbConnection } from './db/db.js';
import vehicleRoutes from './views/vehicles/routes.js';
import saleRoutes from './views/sales/routes.js';

dotenv.config({ path: './.env' })

const app = express()
app.use(express.json())
app.use(cors())
app.use(vehicleRoutes)
app.use(saleRoutes)

const main = () => {
    return app.listen(process.env.PORT, () => {
        console.log(`Listening ${process.env.PORT}`);
    })
}

dbConnection(main)