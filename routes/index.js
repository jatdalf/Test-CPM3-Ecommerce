"use strict";
const { Router } = require('express')
const {listCategories, addCategory, getProds, addProduct, listProducts, getReviews, addReview} = require("../models/model.js")

var userRouter = Router();

const models = require("../models/model");

// escriban sus rutas acá
// siéntanse libres de dividir entre archivos si lo necesitan

userRouter.get("/categories", (req, res)=>{
    res.status(200).json(listCategories())    
})
userRouter.post("/categories", (req, res)=>{
    const {category} = req.body
    try {
        const NewCategory = addCategory(category)      
        res.status(201).json({ msg: 'Categoría creada correctamente' })
    } catch (error) {        
        return res.status(400).json({ error: 'La categoría ya existe' })
    }
})
userRouter.get('/products',(req,res)=>{
    const prodsList = getProds()
    res.status(200).json(prodsList)
})
userRouter.post('/products', (req, res)=>{
    const {name, brand, category, stock} = req.body
    try {
        const newProd = addProduct(name, brand, category, stock)
        const prodsList = getProds()
        res.status(201).json(prodsList[prodsList.length-1])
    } catch (error) {
        return res.status(404).json({ error: 'La categoría ingresada no existe' })
    }
})
userRouter.get('/products/:categoryName',(req,res)=>{
    const {categoryName} = req.params
    const {fullName} = req.query
    try {
        const prodsByCategory = listProducts(categoryName, fullName)
        res.status(200).json(prodsByCategory)
    } catch (error) {
        return res.status(404).json({ error: 'La categoría no existe' })
    }
})
userRouter.get("/reviews", (req, res)=>{
    const {name} = req.query   
    try {
        const Rev = getReviews(name)        
        res.status(200).json(Rev)
    } catch (error) {
        res.status(404).json({ error: 'Producto no encontrado' })
    }
})
userRouter.post("/reviews", (req,res)=>{
    const {name, stars, text, user} = req.body
    try {
        const AddRev = addReview(name, stars, text, user)
        res.status(200).json(AddRev)
    } catch (error) {
        res.status(400).json({ error: 'Producto no encontrado' })
    }
})


module.exports = userRouter;