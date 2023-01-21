'use strict';
//var router = require('./routes')
var express = require('express');
var app = express();
// Acuérdense de agregar su router o cualquier middleware que necesiten acá.
const router = require("./routes/index.js");


app.use(express.json())
app.use("/",router)



module.exports = app; 
