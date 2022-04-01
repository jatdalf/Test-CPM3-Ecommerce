"use strict";

var express = require("express");


var router = express.Router();
module.exports = router;


const models = require("../models/model");


// escriban sus rutas acá
// siéntanse libres de dividir entre archivos si lo necesitan

router.get('/categories',(req,res)=>{
    res.json(models.listCategories())
})

router.post('/categories', (req,res)=>{
    const {category} = req.body;
    try{
        res.status(201).json({msg:models.addCategory(category)})
    }catch (error){
        res.status(400).json({ error: error})
    }
})