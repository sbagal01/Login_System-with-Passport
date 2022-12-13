const express=require('express');
const app=express();
require('dotenv').config();
const expressLayouts=require('express-ejs-layouts');
const mongoose=require('mongoose');
const port=process.env.PORT;
const flash=require('connect-flash')
const session=require('express-session');
const passport=require('passport');
const db=process.env.mongoUrl;

//passport Config
require('./model/passport.js')(passport);

mongoose.connect(db,{useNewUrlParser:true}).then(()=>{
    console.log('Mongoose connected')
}).catch((err)=>{
    console.log(err);
})
app.use(flash());
app.use(session({
    secret:process.env.secret,
    resave:false,
    saveUninitialized:false
}))
app.use(passport.initialize());
app.use(passport.session());
//Global vars
app.use((req,res,next)=>{
    res.locals.success_msg=req.flash('success_msg');
    res.locals.error_msg=req.flash('error_msg');
    res.locals.error=req.flash('error');
    next();
})

//body parser
app.use(express.urlencoded({extended:false}));

//ejs
app.use(expressLayouts);
app.set('view engine','ejs');

app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users'));



app.listen(port,()=>{
    console.log(`Listening to ${port}`)
})