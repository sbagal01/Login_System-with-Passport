const express=require('express');
const router=express.Router();
const {ensureAuth,forwardAuthenticated}=require('../model/Auth.js');

router.get('/',forwardAuthenticated,(req,res)=>{
    res.render('welcome');
})

router.get('/dashboard',ensureAuth,(req,res)=>{
    res.render('dashboard',{
        user:req.user
    });
})

module.exports=router;