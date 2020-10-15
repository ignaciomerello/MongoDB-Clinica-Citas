const express = require('express');
const app = express();


//Middleware
app.use(express.json());




app.listen(3000, ()=> console.log('Server working'));