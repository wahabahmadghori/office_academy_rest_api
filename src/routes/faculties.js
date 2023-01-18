const { Router } = require('express')
const router = Router()
const { Faculty } = require('../models/faculty')
const mongoose = require('mongoose')

router.get('/', (req, res) => {
    Faculty.find().then(faculties => {
        res.status(200).json({
            faculties: faculties
        })
    }).catch(error => {
        res.status(400).json({
            error: error
        })
    })
})

router.post('/', (req, res) => {
    const { name, email, phone, gender, subject } = req.body
    const faculty = Faculty({
        name,
        email,
        phone,
        gender,
        subject
    })
    faculty.save().then(newFaculty => {
        res.status(200).send({
            newFaculty: newFaculty
        })
    }).catch(error => {
        res.status(400).json({
            error: error
        })
    })

})

router.get("/:id", async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).send('Invalid ObjectID')
        const faculty = await Faculty.findById(req.params.id)
        if (!faculty) return res.status(400).send('Not Found Faculty')
        res.status(200).json({
            faculty: faculty
        })
    } catch (error) {
        res.status(400).json({
            error: error
        })
    }
})

router.delete("/:id", async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).send('Invalid ObjectID')
        const faculty = await Faculty.findByIdAndRemove(req.params.id)
        if (!faculty) return res.status(400).send('Not Found Faculty')
        res.status(200).json({
            faculty: faculty
        })
    } catch (error) {
        res.status(400).json({
            error: error
        })
    }


})
router.put("/:id", async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).send('Invalid ObjectID')
        const { name, email, phone, gender, subject } = req.body
        const faculty = await Faculty.findByIdAndUpdate(req.params.id, {
            name,
            email,
            phone,
            gender,
            subject
        },{
            new: true
        })
        if (!faculty) return res.status(400).send('Not Found Faculty')
        res.status(200).json({
            faculty: faculty
        })
    } catch (error) {
        res.status(400).json({
            error: error
        })
    }


})

module.exports = router