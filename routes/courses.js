const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router(); // returns router object

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
});

const Course = mongoose.model('Course', courseSchema);


router.get('/', async (req, res) => {
    const courses = await Course.find().sort('name');
    res.send(courses);
})

router.post('/', async (req, res) => {
    const { error } = validateCourse(req.body); // result.error

    if(error) {
        // 400 Bad Request
        return res.status(400).send(error.details[0].message);
    }

    let course = new Course ({ name: req.body.name });

    course = await course.save();
    res.send(course);
})

router.put('/:id', async (req, res) => {
    const { error } = validateCourse(req.body); // result.error

    if(error) {
        // 400 Bad Request
        return res.status(400).send(error.details[0].message);
    }

    const course = await Course.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
        new: true
    });
    
    if(!course) {
        return res.status(404).send('The course with given id is not found');
    }
    

    // update course
    course.name = req.body.name;
    res.send(course);
})

router.delete('/:id', async (req, res) => {
    const course = await Course.findByIdAndRemove(req.params.id);
    
    if(!course) return res.status(404).send('The course with given id is not found');


    res.send(course);
})


router.get('/:id', async (req, res) => {
    const course = await Course.findById(req.params.id);

    if(!course) return res.status(404).send('The course with given id is not found');
    res.send(course);
})

function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required()
    }

    return Joi.validate(course, schema);
}


module.exports = router;