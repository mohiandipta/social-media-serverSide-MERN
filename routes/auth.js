import express, { Router } from "express";

const router = express.Router()


router.post("/register", (req, res) => {
    console.log("REGISTER ENDPOINT =>", req.body)
})

module.exports = router;