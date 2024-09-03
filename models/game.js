require('dotenv').config();
const mongoose = require('./connection')
const GameSchema = new mongoose.Schema({
    name: String,
    logo: String,
    mainCharacter: String,
    consoleType: String,
    rating: String,
    username: String,
    lastEditedBy: String,
})
const GameInfo=mongoose.model('games',GameSchema);
module.exports = GameInfo