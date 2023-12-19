const mongoose = require('mongoose');

const { isEmail } = require('validator');
const bcrypt = require ('bcrypt'); 

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique : true
    },
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    numero: {
        type: String,
        require: true,
    },
    image: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        required: [true, 'Please enter an password'],
    },
    is_admin:{
        type:Number,
        required : true
    },
    is_varified:{
        type:Number,
        default:0,
    }
});

// fire a function after doc saved to db


// fire a function before doc saved to db

userSchema.pre('save', async function(next){

    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);   
    next()
})

// static method to login user


userSchema.statics.login = async function(email, password){

    const user = await this.findOne({ email })

    if (user){

       const auth = await bcrypt.compare(password, user.password);

       if (auth){
            return user;
       }
       throw Error('incorrect password');
    }
    throw Error('incorrect email');
}

const User = mongoose.model('user', userSchema);

module.exports = User;