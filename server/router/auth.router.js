const express = require('express');
const router = express.Router();
const cors = require('cors');
const { checkUser, createUser } = require('../controller/auth.controller.js')

router.post('/', checkUser)
router.post('/create/zestlark', createUser)

module.exports = router