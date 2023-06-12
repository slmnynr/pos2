const Bill = require("../models/Bill.js");

const express = require("express");

const router = express.Router();


router.get("/get-all",async(req,res)=>{
    try {
        const bills = await Bill.find()
        res.send(bills)
        res.status(200).json("get  successfully")
    } catch (error) {
        console.log(error)
    }
})

// router.put("/update-bill",async(req,res)=>{
//     try {
//        await Bill.findOneAndUpdate({_id: req.body.billId},req.body)     
//         res.status(200).json("update successfully")
//     } catch (error) {
//         console.log(error)
//     }
// })

// router.delete("/delete-bill",async(req,res)=>{
//     try {
//        await Bill.findOneAndDelete({_id: req.body.billId})     
//         res.status(200).json("delete successfully")
//     } catch (error) {
//         console.log(error)
//     }
// })


router.post("/add-bill",async(req,res)=>{
    try {
        const newBill = new Bill(req.body);
        await newBill.save();
        res.status(200).json("item add successfully")
    } catch (error) {
        res.status(400).json(error)
    }
})

module.exports=router;