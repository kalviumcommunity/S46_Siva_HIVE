const express = require('express')

const {loginUser, signupUser} = require('../Controller/userController')

const router = express.Router()

// Login
router.post('/login', loginUser)

// Signup
router.post('/signup', signupUser)

module.exports = router
