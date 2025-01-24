const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const User         =  require('../Models/user.model')
const {authSchema} = require('../helpers/validationSchema')
const {signAccessToken} = require('../helpers/jwthelper')


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
        const accessToken = await signAccessToken(savedUser.id)
        res.send(accessToken);
    }
    catch(error){
        if(error.isJoi === true) error.status = 422
        next(error);

    }

})
router.post('/login',async(req,res,next) => {
try{
    const result = await authSchema.validateAsync(req.body);
    res.send(result);
}catch(error){
    
    if(error.isJoi === true){
        return next(createError.BadRequest('Invalid username / password'));
        next(error);
    }
  }
})

router.post('/refresh-token',async(req,res) => {
    res.send("token refresh route");
})


module.exports = router