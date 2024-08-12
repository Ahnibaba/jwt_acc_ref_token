import dotenv from "dotenv"
dotenv.config()
import express from "express"
import mongoose from "mongoose"
import { connectDB } from "./config/db.js"
import cors from "cors"
import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser"
import regRouter from "./routes/registerRoute.js"
import loginRouter from "./routes/loginRoute.js"
import dashboardRouter from "./routes/dashboardRoute.js"

const PORT = process.env.PORT || 4001;


const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials: true
}))



//connectdb
connectDB()

app.use("/register", regRouter)
app.use("/login", loginRouter)
app.use("/dashboard", dashboardRouter)

app.get("/", (req, res) => {
    res.send("Hello")
})


app.listen(PORT, () => {
    console.log(`Server is starting at http://localhost:${PORT}`);
})



//require("crypto").randomBytes(32).toString("hex")