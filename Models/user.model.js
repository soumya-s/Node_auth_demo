const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const userSchema = new Schema({
    email:{
        type : String,
        required:true,
        lowercase:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
});
userSchema.pre('save',async function(next) {
    try{
        const salt = await bcrypt.genSalt(10);
        console.log("password"+this.password);
        const hashedPassword = await bcrypt.hash(this.password,salt)
        this.password = hashedPassword;
        next();
    }
    catch(error){
        next(error)

    }
userSchema.post('save',async function (next) {
    try{
        console.log("after save")
    }
    catch(error){
        console.log(error)
    }
})    
})
const User = mongoose.model('user',userSchema);
module.exports = User;