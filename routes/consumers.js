const { Consumer, validate } = require('../models/consumers')
const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();


router.get('/', async (req, res) => {
    const consumers = await Consumer.find().sort('name');
    res.send(consumers);
})

router.post('/', async (req, res) => {
    let consumer = new Consumer({ 
        isGold: req.body.isGold,
        name: req.body.name,
        phone: req.body.phone
    })

    consumer = await consumer.save()
    res.send(consumer);
})

router.put('/:id', async (req, res) => {
    let consumer = await Consumer.findByIdAndUpdate(req.params.id, { name: req.body.name, phone: req.body.phone }, {
        new: true,
    })

    if(!consumer) {
        return res.status(404).send('The requested consumer id is not exist');
    }
    res.send(consumer);
})

router.delete('/:id', async (req, res) => {
    let consumer = await Consumer.findByIdAndRemove(req.params.id);

    if(!consumer){
        return res.status(404).send('The consumer with id does not exist');
    }

    res.send(consumer);
})

router.get('/:id', async (req, res) => {
    let consumer = await Consumer.findById(req.params.id);
    if(!consumer) {
        return res.status(404).send('The consume with id doesnot exist');
    }

    res.send(consumer);
})


module.exports = router;