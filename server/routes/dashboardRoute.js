import express from "express"
import { getDashboard } from "../controllers/dashboardController.js"
import { verifyJwt } from "../middleware/verifyJwt.js"


const dashboardRouter = express.Router()

dashboardRouter.get("/", verifyJwt, getDashboard)

export default dashboardRouter     