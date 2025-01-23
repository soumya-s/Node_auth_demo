const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const User         =  require('../Models/user.model')
const {authSchema} = require('../helpers/validationSchema')


router.post('/register',async(req,res,next)=>{
 try{
        //const {email,password} = req.body
        const result = await authSchema.validateAsync(req.body);
        console.log(result.email);

        // if(!email||!password) throw createError.BadRequest();
        // console.log("register data",req.body);
        
        const doExists = await User.findOne({email:result.email})        
        if(doExists) throw createError.Conflict(`${result.email} already registered`)
        
        const user = new User(result)
        const savedUser = await user.save();   
        res.send(savedUser);
    }
    catch(error){
        if(error.isJo === true) error.status = 422
        next(error);

    }

})
router.post('/login',async(req,res) => {
    res.send("Login route");
})

router.post('/refresh-token',async(req,res) => {
    res.send("token refresh route");
})


module.exports = router