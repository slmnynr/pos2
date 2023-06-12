const User = require("../models/User.js");

const express = require("express");

const router = express.Router();

const bcrypt=require("bcryptjs")


router.get("/get-all",async(req,res)=>{
    try {
        const users = await User.find()
        res.send(users)
        res.status(200).json("get  successfully")
    } catch (error) {
        console.log(error)
    }
})

// router.put("/update-User",async(req,res)=>{
//     try {
//        await User.findOneAndUpdate({_id: req.body.UserId},req.body)     
//         res.status(200).json("update successfully")
//     } catch (error) {
//         console.log(error)
//     }
// })

// router.delete("/delete-User",async(req,res)=>{
//     try {
//        await User.findOneAndDelete({_id: req.body.UserId})     
//         res.status(200).json("delete successfully")
//     } catch (error) {
//         console.log(error)
//     }
// })


router.post("/register",async(req,res)=>{
    try {
        const {userName,email,password} =req.body;
        const salt= await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        const newUser = new User({
            userName,
            email,
            password:hashedPassword
        });
        await newUser.save();
        res.status(200).json("item add successfully")
    } catch (error) {
        res.status(400).json(error)
    }
})
router.post("/login", async(req,res)=>{
    try {
        const user = await User.findOne({email:req.body.email});
         if(!user){
            res.status(404).send({error:"user not found"})
         }

        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if(!validPassword){
            res.status(403).json("invalid password");
        }
        else{
            res.status(200).json(user)
        }      
    } 
     catch (error) {
        res.status(400).json(error)
    }
})

module.exports=router;