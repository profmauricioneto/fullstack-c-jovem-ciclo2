const userControllers = require('./user.controllers');
const express = require('express');
const router = express.Router();

router.post('/api/auth/register', userControllers.registerUserController);
router.post('/api/auth/login', userControllers.loginController);
router.get('/api/auth/users', userControllers.getAllUsersController);

module.exports = router;
