const { Router } = require('express')
const router = Router()
const { User } = require('../models/user')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

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

router.post('/register', (req, res) => {
    let { userName, email, password, phone, userType } = req.body
    password = bcrypt.hashSync(password, 10)

    const user = User({
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


module.exports = router