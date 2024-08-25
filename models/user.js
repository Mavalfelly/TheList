require('dotenv').config();
const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    username: {type: String, require: true, unique: true},
    password: {type: String, require: true},
    age: {type: Number, require: true},
    admin: Boolean
});

const User = mongoose.model('user', UserSchema);
module.exports = User