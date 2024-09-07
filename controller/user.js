const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const Game = require('../models/game');


router.get('/landing', async (req,res) => {
    try{
        const games = await Game.find()
        res.render('./user/landing.ejs',{games}) 
    }catch(err){
        res.sendStatus(400).json(err)
    }
})
router.get('/signup', (req,res)=>{
    res.render('user/signup.ejs')
})

router.post('/signup', async (req,res)=>{
    try{
        req.body.password = await bcrypt.hash(req.body.password, await bcrypt.genSalt(11));
        await User.create(req.body);
        res.redirect('/user/login')
    }catch(err){
        res.sendStatus(400).json(err)
    }
})

router.get('/login', (req,res)=>{
    res.render('user/login.ejs')
})

router.post('/login', async (req,res)=>{
    try{
        const user = await User.findOne({username: req.body.username});
        if(!user){
            res.render('user/wrongInfo.ejs')
        }else{
            const passwordMatch = bcrypt.compareSync(req.body.password, user.password)
            if(passwordMatch){
                console.log(req.session);
                req.session.username = req.body.username;
                req.session.loggedIn = true;
                res.redirect('/games')
            }else{
                res.render('user/wrongInfo.ejs')
            }
        }

    }catch(err){
        res.sendStatus(400).json(err)
    }
})
router.get('/wrong', (req,res)=>{
    res.render('user/wrongInfo.ejs')
})
router.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        res.clearCookie()
        res.redirect("/user/landing")
    })
})
module.exports = router