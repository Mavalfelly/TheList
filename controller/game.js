const express = require('express');
const router = express.Router();
const Game = require('../models/game');

router.get('/', async(req,res)=>{
    try{
        const games = await Game.find()
        console.log(games)
        res.render('landing.ejs') 
    }catch(err){
        res.sendStatus(400).json(err)
    }
})




module.exports = router