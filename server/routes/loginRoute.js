import express from "express"
import { loginUser } from "../controllers/loginController.js"


const loginRouter = express.Router()

loginRouter.route("/")
    .post(loginUser)
 export default loginRouter   