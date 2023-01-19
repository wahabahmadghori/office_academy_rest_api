const { Router } = require('express')
const router = Router()
const { User } = require('../models/user')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.get('/', (req, res) => {
    User.find().then(users => {
        res.status(200).json({
            users: users
        })
    }).catch(error => {
        res.status(400).json({
            error: error
        })
    })
})

router.post('/register', async(req, res) => {
    let { userName, email, password, phone, userType } = req.body
    let user = await User.findOne({email})
    if(user) return res.status(400).send('Email alreay exist')
    password = bcrypt.hashSync(password, 10)

    user = User({
        userName,
        email,
        password,
        phone,
        userType
    })
    user.save().then(newUser => {
        res.status(200).json({
            newUser: newUser
        })
    }).catch(error => {
        res.status(400).json({
            error: error
        })
    })
})


router.post('/login', async (req, res) => {
    try {
        let { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) return res.status(400).send("User does not exit")
        const isAuthenticated = bcrypt.compareSync(password, user.password)
        if (!isAuthenticated) return res.status(400).send("Pasword is incorrect")
        const { userName, phone, userType } = user
        const token = jwt.sign({
            userName,
            email,
            phone,
            userType
        },
            process.env.JWT_SECRET,
            {
                expiresIn: '1d'
            })
        res.status(200).json({
            token: token
        })
    } catch (error) {
        res.status(500).json({
            error
        })
    }


})

module.exports = router