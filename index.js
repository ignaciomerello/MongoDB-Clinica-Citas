const express = require('express');
const app = express();
const cors = require('./mw/cors');

//User Controller
const {showUsers} = require('./db/dbuser');
const {registerUser} = require('./db/dbuser');




//Middleware
app.use(express.json());

//db connection
const dbconnect = require('./config/dbconnect');

dbconnect();


//User Actions
app.get('/users/showall', showUsers);
app.post('/users/register', registerUser);


app.listen(3000, ()=> console.log('Server working'));