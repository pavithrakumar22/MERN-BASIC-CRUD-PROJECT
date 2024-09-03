const express = require('express');
const mongoose=require("mongoose");
const User = require('../models/userModel');
const router = express.Router();

//Add user
router.post("/",async (req,res)=>{
    const {name,email,age}=req.body;

    try {
        const userAdded=await User.create({
            name : name,
            email: email,
            age: age,
        })
        console.log("User Added");
        res.json(userAdded);
    } catch (error) {
        console.log(error);
        res.json({error: error.message});
    }
})

//show users

router.get('/',async(req,res)=>{
    try {
        const showAll = await User.find();
        console.log("Users shown");
        res.json(showAll);
    } catch (error) {
        res.json({error: error.message});
    }
});

//get single user

router.get('/:id',async(req,res)=>{
    const {id}=req.params;
    try {
        const singleUser = await User.findById({_id:id});
        console.log("User found");
        res.json(singleUser);
    } catch (error) {
        res.json({error: error.message});
    }
});

//delete

router.delete('/:id',async(req,res)=>{
    const {id}=req.params;
    try {
        const singleUser = await User.findByIdAndDelete({_id:id});
        console.log("User deleted")
        res.json(singleUser);
    } catch (error) {
        res.json({error: error.message});
    }
});

//put(patch)

router.patch('/:id',async(req,res)=>{
    const {id}=req.params;
    const {name,email,age}=req.body;
    try {
        const updateUser = await User.findByIdAndUpdate(id,req.body,{new:true});
        console.log("User updated");
        res.json(updateUser);
    } catch (error) {
        console.log({error: error.message});
    }
});


module.exports=router