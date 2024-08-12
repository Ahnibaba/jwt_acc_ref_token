import express from "express"
import { addUser } from "../controllers/registerController.js"

const regRouter = express.Router()

regRouter.post("/", addUser)

export default regRouter   