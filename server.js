require('dotenv').config();
const express = require('express');
const TeamInfo = require('./models/TeamInfo');
const methodOverride = require('method-override');
const TeamRouter = require('./controller/team');
const morgan = require('morgan');
const app = express();
//////////////////////////////////////
////////////MIDDLEWARE////////////////
//////////////////////////////////////
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use('/team', TeamRouter);
app.use('/user', UserRouter);
//////////////////////////////////////
//////////////ROUTES//////////////////
//////////////////////////////////////
app.get('/test',(req,res)=>{
    res.send('<h1>hello world. we wre connected</h1>')
});

app.listen(PORT,()=>{
    console.log(`You are listening to Port ${process.env.PORT}`)
});

