const Category = require("../models/Category.js");

const express = require("express");

const router = express.Router();


router.get("/get-all",async(req,res)=>{
    try {
        const categories = await Category.find()
        res.send(categories)
        res.status(200).json("get  successfully")
    } catch (error) {
        console.log(error)
    }
})

router.put("/update-category",async(req,res)=>{
    try {
       await Category.findOneAndUpdate({_id: req.body.categoryId},req.body)     
        res.status(200).json("update successfully")
    } catch (error) {
        console.log(error)
    }
})

router.delete("/delete-category",async(req,res)=>{
    try {
       await Category.findOneAndDelete({_id: req.body.categoryId})     
        res.status(200).json("delete successfully")
    } catch (error) {
        console.log(error)
    }
})


router.post("/add-category",async(req,res)=>{
    try {
        const newCategory = new Category(req.body);
        await newCategory.save();
        res.status(200).json("item add successfully")
    } catch (error) {
        res.status(400).json(error)
    }
})

module.exports=router;