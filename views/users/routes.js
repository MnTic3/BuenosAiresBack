import express from 'express'
import { createOneUser, deleteOneUserParams, editOneUserParams, getAllUsers, getUser } from '../../controllers/users/controller.js';


const userRoutes = express.Router();

const genericCallBack = (res) => (err, result) => {
    if (err) {
        res.sendStatus(500)
    } else {
        res.json(result)
    }
}

userRoutes.route("/users/").get((req, res) => {
    getAllUsers(genericCallBack(res))
})

userRoutes.route("/users/:id").get((req, res) => {
    getUser(req.params.id, genericCallBack(res))
})

userRoutes.route("/users/").post((req, res) => {
    createOneUser(req.body, genericCallBack(res))
})

userRoutes.route("/users/:id/").patch((req, res) => {
    editOneUserParams(req.params.id, req.body, genericCallBack(res))
})

userRoutes.route("/users/:id/").delete((req, res) => {
    deleteOneUserParams(req.params.id, genericCallBack(res))
})

export default userRoutes;