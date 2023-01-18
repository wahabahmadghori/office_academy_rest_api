const { Router } = require('express')
const router = Router()
const { Student } = require('../models/student')
const mongoose = require('mongoose')

router.get('/', (req, res) => {
    Student.find().populate('faculty').then(students => {
        res.status(200).json({
            students: students
        })
    }).catch(error => {
        res.status(400).json({
            error: error
        })
    })
})

router.post('/', (req, res) => {
    const { name, email, phone, gender, faculty } = req.body
    const student = Student({
        name,
        email,
        phone,
        gender,
        faculty
    })
    student.save().then(newStudent => {
        res.status(200).send({
            newStudent: newStudent
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
        const student = await Student.findById(req.params.id)
        if (!student) return res.status(400).send('Not Found Student')
        res.status(200).json({
            student: student
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
        const student = await Student.findByIdAndRemove(req.params.id)
        if (!student) return res.status(400).send('Not Found Student')
        res.status(200).json({
            student: student
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
        const { name, email, phone, gender, faculty } = req.body
        const student = await Student.findByIdAndUpdate(req.params.id, {
            name,
            email,
            phone,
            gender,
            faculty
        },{
            new: true
        })
        if (!student) return res.status(400).send('Not Found Student')
        res.status(200).json({
            student: student
        })
    } catch (error) {
        res.status(400).json({
            error: error
        })
    }


})

module.exports = router