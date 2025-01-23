const mongoose = require('mongoose');
mongoose
.connect(process.env.MONGO_URI)
.then(() =>{
    console.log('mongodb connected')
})
.catch((err) => console.log(err.message))

mongoose.connection.on('connected',()=>{
    console.log("MOngoose connected to db");
})

mongoose.connection.on('error',(err)=>{
    console.log(err.message);
})

mongoose.connection.on('disconnected',()=>{
    console.log("Mongoose disconnected");
})


mongoose.connection.on('connected',()=>{
    console.log("MOngoose connected to db");
})

mongoose.connection.on('disconnected',()=>{
    console.log("Mongoose connection is disconnected");
})

process.on('SIGINT',async()=>{
    await mongoose.connection.close();
    process.exit(0);
})