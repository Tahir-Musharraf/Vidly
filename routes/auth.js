const config = require('config')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Joi = require('joi')
const _ = require("lodash"); 
const { User } = require('../models/users')
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();



// Register/POST single user
router.post("/", async (req, res) => {
    const { error } = Validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).send("Invaild username or password!")

    let validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return res.status(400).send("Invaild username or password!")
    
    const token = user.generateAuthToken()
    res.send(token);
})
function Validate(obj){
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(1024).required(),
    });
    return schema.validate(obj);
    // return Joi.validate(user, userSchema ) //another way of doing same thing
}

module.exports = router