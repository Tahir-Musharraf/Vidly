const mongoose = require('mongoose');
const Joi = require('joi');

const User = mongoose.model('Users', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlenghth: 60
    },
    email: {
        type: String,
        unique: true,
        required: true,
        minlength: 5,
        maxlenghth: 255
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
}))
function validateUsers(user){
    const schema = Joi.object({
        name: Joi.string().min(5).max(60).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(1024).required(),
    });
    return schema.validate(user);
    // return Joi.validate(user, userSchema ) //another way of doing same thing
}

exports.User = User;
exports.Validate = validateUsers;