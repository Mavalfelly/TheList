require('dotenv').config();
const morgan = require('morgan');
const express = require('express');
const methodOverride = require('method-override');
const session = require('express-session');
const PORT = process.env.PORT
const MongoStore = require('connect-mongo');
const app = express();
const GameInfo = require('./models/game');
const GameRouter = require('./controller/game');
const UserRouter = require('./controller/user')


//////////////////////////////////////
////////////MIDDLEWARE////////////////
//////////////////////////////////////
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(session({
    secret: process.env.SECRET,
    store: MongoStore.create({mongoUrl: process.env.DBURL}),
    saveUninitialized: true,
    resave: false,
}))
app.use('/games', GameRouter);
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

