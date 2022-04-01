"use strict";

var express = require("express");
const model = require("../models/model");


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

router.get ('/products', (req,res)=>{
    res.json(models.listProducts())
})

router.post('/products', (req,res)=>{
    const {name, brand,category,stock } = req.body;
    try{
        res.status(201).json(models.addProduct(name, brand,category,stock))
    }catch (error){
        res.status(404).json({ error: error})
    }
})

router.get('/products/:categoryName',(req,res)=>{
    try{
        res.json(models.listProducts(req.params.categoryName,req.query.fullName))
    }catch(error){
        res.status(404).json({ error: error})
    }
})

router.get('/rating', (req,res)=>{
    res.json(models.getRating())
})
router.get('/rating/:product',(req,res)=>{
    try{
        res.json({rating: models.getRating(req.params.product)})
    }catch(error){
        res.status(404).json({ error: error})
    }
})

router.get('/reviews', (req,res)=>{
    try{
        res.json(models.getReviews(req.query.name))
    }catch(error){
        res.status(404).json({error:error})
    }
})

router.post('/reviews',(req,res)=>{
    const {name, stars, text, user} = req.body;
    try{
        res.status(201).json({msg:models.addReview(name, stars, text, user)})
    }catch(error){
        res.status(400).json({error:error})
    }
})