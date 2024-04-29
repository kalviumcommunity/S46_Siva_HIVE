const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique:true,
        validate: {
            validator: (value) => {
                return /^[a-zA-Z0-9]+$/.test(value);
            },
            message: 'Username can only contain letters, numbers.'
        }
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

// Signup
userSchema.statics.signup = async function(username, email, password) {

    // Validation
    if(!username || !email || !password){
        throw Error('All fields must be filled')
    }
    if (!validator.isEmail(email)) {
        throw Error("Email is not valid")
    }
    if (!validator.isStrongPassword(password)) {
        throw Error("Password not strong enough")
    }



    const exists = await this.findOne({ email });

    if(exists) {
        throw Error('Email already exists')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ username, email, password: hash })

    return user;
};

// Login

userSchema.statics.login = async function(email, password) {
    if(!email || !password){
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({email})

    if(!user) {
        throw Error('Incorrect email')
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match) {
        throw Error('Incorrect password')
    }

    return user

}


module.exports = mongoose.model('User', userSchema)