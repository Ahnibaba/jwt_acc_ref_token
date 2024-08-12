import express from "express"
import userModel from "../models/userModel.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


const loginUser = async (req, res) => {
    console.log("am here");
    
    const { email, password } = req.body

    try {
        const exist = await userModel.findOne({ email })

    if (!exist) {
        return res.status(400).json({ success: false, message: "User does not exist" })
    }

    const comparePassword = await bcrypt.compare(password, exist.password)
    if (!comparePassword) {
        return res.status(401).json({ success: false, message: "Enter a valid password" })
    }

    const accessToken = jwt.sign(
        { email: email },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1m" }
    )
    const refreshToken = jwt.sign(
        { email: email },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "5m" }
    )
    res.cookie("accessToken", accessToken, { 
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 60000 
    })
   
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 300000 
    })

    res.status(200).json({ success: true, accessToken, refreshToken, message: "Logged in successfully" })

    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, message: "Login failed" })
        
    }
    



}



export {loginUser}