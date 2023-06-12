const Products = require("../models/Products.js");

const express = require("express");

const router = express.Router();


router.get("/get-all",async(req,res)=>{
    try {
        const products = await Products.find()
        res.send(products)
        res.status(200).json("get  successfully")
    } catch (error) {
        console.log(error)
    }
})

router.put("/update-products",async(req,res)=>{
    try {
       await Products.findOneAndUpdate({_id: req.body.productsId},req.body)     
        res.status(200).json("update successfully")
    } catch (error) {
        console.log(error)
    }
})

router.delete("/delete-products",async(req,res)=>{
    try {
       await Products.findOneAndDelete({_id: req.body.productsId})     
        res.status(200).json("delete successfully")
    } catch (error) {
        console.log(error)
    }
})


router.post("/add-products",async(req,res)=>{
    try {
        const newProducts = new Products(req.body);
        await newProducts.save();
        res.status(200).json("item add successfully")
    } catch (error) {
        res.status(400).json(error)
    }
})

module.exports=router;