const mongoose = require('mongoose');
const Joi = require('joi');

function validateConsumer(consumer){
    const schema = {
        name: Joi.String().minlength(5).maxlength(15).required(),
        phone: Joi.Number().min(5).max(10).required(),
        isGold: Joi.Boolean()
    }
    return Joi.Validate(consumer, schema);
}

const consumerSchema = mongoose.Schema({
    isGold: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 15
    },
    phone: {
        type: Number,
        required: true,
    }
});

const Consumer = mongoose.model('consumer', consumerSchema);

module.exports.Consumer = Consumer;
module.exports.validate = validateConsumer;