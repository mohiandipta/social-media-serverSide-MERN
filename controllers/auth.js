import User from '../models/user'
import { hashPassword, comparePassword } from '../helpers/auth'
import jwt from 'jsonwebtoken'
import expressJwt from "express-jwt"
import { json } from 'express';

// register controller
export const register = async (req, res) => {
    // console.log("REGISTER ENDPOINT =>", req.body)
    const { fName, lName, email, password, secret } = req.body

    // validation
    if (!fName) {
        return res.status(400).send("fName is required")
    }
    if (!lName) {
        return res.status(400).send("lName is required")
    }
    if (!email) {
        return res.status(400).send("email is required")
    }
    if (!password || password.length < 6) {
        return res.status(400).send("password is required and should be 6 characters long")
    }
    if (!secret) {
        return res.status(400).send("secret is required")
    }

    const exist = await User.findOne({ email })
    if (exist) {
        return res.status(400).send("Email is taken")
    }

    // hashPassword
    const hashedPassword = await hashPassword(password)
    const user = new User({ fName, lName, email, password: hashedPassword, secret })
    try {
        await user.save();
        console.log("REGISTERD USE =>", user)
        return res.json(
            { ok: true }
        )
    }
    catch (err) {
        console.log("REGISTERD FAILED =>", err)
        return res.status(400).send("Error, Try Again");
    }
};


// login controller
export const login = async (req, res) => {
    console.log(req.body)
    try {
        const { email, password } = req.body
        // check if db has an user data
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).send('User can not be found! Please enter correct email address')
        }
        // check password
        const match = await comparePassword(password, user.password)
        if (!match) {
            return res.status(400).send('Wrong password!')
        }
        //
        // CREATE SIGNED TOKEN (JWT)
        const token = jwt.sign(
            { _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '3d' } //token expire duration
        )
        user.password = undefined
        user.secret = undefined
        res.json({
            user: user.email,
            token: token
        })
    } catch (error) {
        console.log(error)
        return res.status(400).send('Error. Try again')
    }
}


// currentUser
export const currentUser = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
        // res.json(user)
        res.json({ ok: true })
    } catch (err) {
        console.log(err)
        res.sendStatus(400)
    }
}