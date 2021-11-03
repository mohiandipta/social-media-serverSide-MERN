import User from '../models/user'
import { hashPassword, comparePassword } from '../helpers/auth'

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