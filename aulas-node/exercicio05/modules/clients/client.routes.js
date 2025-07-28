const express = require('express');
const router = express.Router();
const clientController = require('./client.controller');

router.post('/register', clientController.registerClientController);
router.post('/login', clientController.loginClientController);

module.exports = router;