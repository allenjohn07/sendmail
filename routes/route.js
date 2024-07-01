const express = require('express')
const { sendMail } = require('../controller/appController')
const router = express.Router()

router.post('/send', sendMail)


module.exports = router