const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');

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

router.post('/signup', async (req,res)=>{
    try{
        const user = await User.findOne({username: req.body.username});
        if(!user){
            res.render('wrongU.ejs')
        }else{
            const passwordMatch = bcrypt.compareSync(req.body.password, user.password)
            if(passwordMatch){
                console.log(req.session);
                req.session.username = req.body.username;
                req.session.loggedIn = true;
                res.redirect('/games')
            }else{
                res.render('wrongP.ejs')
            }
        }

    }catch(err){
        res.sendStatus(400).json(err)
    }
})
router.get("/logout", (req, res) => {
    // destroy session and redirect to main page
    req.session.destroy((err) => {
        res.clearCookie()
        res.redirect("/user/login")
    })
})
module.exports = router