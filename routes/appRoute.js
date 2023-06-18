const router = require('express').Router()
const { sendTestEmail , sendRealEmail} = require('../controller/appController')

router.post("/email/test",sendTestEmail )

router.post("/email/real", sendRealEmail )


module.exports = router