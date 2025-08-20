const userControllers = require('./user.controllers');
const express = require('express');
const router = express.Router();

router.post('/register', userControllers.registerUserController);
router.post('/login', userControllers.loginController);
router.get('/users', userControllers.getAllUsersController);

module.exports = router;
