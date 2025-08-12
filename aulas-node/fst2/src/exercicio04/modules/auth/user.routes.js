const userController = require('./user.controllers')
const express = require('express');

const router = express.Router();

router.post('/register', userController.registerUserController);
router.post('/login', userController.loginController);
router.get('/users', userController.getAllUsersController);

module.exports = router;