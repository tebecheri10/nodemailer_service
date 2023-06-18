const express = require("express");
require("dotenv").config()
const appRoute = require('./routes/appRoute')
const app = express();
app.use(express.json())

//config
const PORT = process.env.PORT || 5500

//router
app.use("/api", appRoute)

//run server
app.listen(PORT, ()=>{ console.log("server running ok")})