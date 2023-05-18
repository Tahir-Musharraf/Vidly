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

    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    await user.save();
    // Return the added movie to user
    res.send(user);
})

module.exports = router