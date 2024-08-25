const express = require('express');
const router = express.Router();
const Game = require('../models/game');

router.get('/', async (req,res) => {
    try{
        const games = await Game.find()
        console.log(games)
        res.render('landing.ejs') 
    }catch(err){
        res.sendStatus(400).json(err)
    }
});
router.get('/new', (req,res) => {
    res.render('new.ejs')
});
router.post('/', async (req,res) => {
    try{
        req.body.username = req.session.username
        await Game.create(req,res)
        console.log(games)
        res.redirect('/games') 
    }catch(err){
        res.sendStatus(400).json(err)
    }
});
router.get('/:id', async (req, res) => {
    try{
    const id = req.params.id;
    const game = await Game.findById(id);
    res.render('edit.ejs', { game });
    }catch(err){
        res.sendStatus(400).json(err)
    }
});
router.put('/:id', async (req,res) => {
    try{
        const id = req.params.id;
        const game = await Game.findByIdAndUpdate(id, req.body);
        res.redirect('/games')
    }catch(err){
        res.sendStatus(400).json(err)
    }
});
router.delete('/:id', async (req,res) => {
    try{
        const id = req.params.id
        const game = await Game.findByIdAndDelete(id);
        res.redirect('/fruit')
    }catch(err){
        res.sendStatus(400).json(err)
    }

})


module.exports = router