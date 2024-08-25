require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.DBURL);
mongoose.connection
    .on('open',()=>console.log('Connected to Mongo'))
    .on('close', ()=>console.log('Not connected to Mongo'))
    .on('error',(err)=>console.log('error',err));
module.exports = mongoose
