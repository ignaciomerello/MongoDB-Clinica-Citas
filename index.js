const express = require('express');
const app = express();


//Middleware
app.use(express.json());

//db connection
const dbconnect = require('./config/dbconnect');

dbconnect();


app.listen(3000, ()=> console.log('Server working'));