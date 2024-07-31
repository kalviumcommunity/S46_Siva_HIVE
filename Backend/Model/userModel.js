const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  googleId: {
    type: String
  }
},{timestamp: true});

// Signup method
userSchema.statics.signup = async function(username, email, password) {
  if (!email || !password || !username) {
    throw Error('All fields must be filled');
  }
  
  const exists = await this.findOne({ $or: [{ email }, { username }] });
  if (exists) {
    throw Error('Email or username already in use');
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash, username });
  return user;
};

// Login method
userSchema.statics.login = async function(email, password) {
  if (!email || !password) {
    throw Error('All fields must be filled');
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw Error('Incorrect email');
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error('Incorrect password');
  }

  return user;
};

module.exports = mongoose.model('User', userSchema);