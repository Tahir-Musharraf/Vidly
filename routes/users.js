const bcrypt = require('bcrypt')
const _ = require("lodash"); 
const { User, Validate } = require('../models/users')
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();



// Register/POST single user
router.post("/", async (req, res) => {
    const { error } = Validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email })
    if (user) return res.status(400).send("User is already Registered!")

    user = new User(_.pick(req.body, ['name','email', 'password']))
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt)
    await user.save();
    // Return the added movie to user
    res.send(_.pick(user, [ '_id', 'name', 'email']));
})

module.exports = router