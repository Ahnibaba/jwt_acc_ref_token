import express from "express"
import bcrypt from "bcryptjs"
import userModel from "../models/userModel.js"



const addUser = async (req, res) => {

    const { name, email, password } = req.body

    try {

        

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" })
        }

        const duplicate = await userModel.findOne({ email })
        if (duplicate) {
            return res.status(409).json({ success: false, message: "User already exist" })
        } 

        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "create a stronger password" })
        }

        const salt = await bcrypt.genSalt(10, password)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name: name,
            email: email, 
            password: hashedPassword
        })
        const user = await newUser.save()
        
        res.status(200).json({ success: true, message: "New User created" })
    } catch (err) {
        console.log(err);
        res.status(400).json({ success: false, message: err })

    }

}

export { addUser }