const express = require('express');
const morgan = require('morgan');
const createErrors = require('http-errors');
const AuthRoute = require('./Routes/Auth.route');
require('dotenv').config();
require('./helpers/dbConnection');

var app = express();
var Port = process.env.PORT||3000;
console.log(Port);


app.use(express.json());
app.use(morgan('dev'));
app.use('/auth',AuthRoute);
app.get('/',async(req,res,next)=>{
    res.send("Hello express");
})
app.use(async(req,res,next)=>{
    next(createErrors.NotFound())
})
app.listen(Port,() =>{
    console.log("Server running");
})

app.use((err,req,res,next) => {
    res.status(err.status||500)
    res.send({error:{
        status: err.status || 500,
        message : err.message
    }})
})