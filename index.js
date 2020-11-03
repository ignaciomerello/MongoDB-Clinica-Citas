const express = require('express');
const app = express();
const cors = require('./mw/cors');
const PORT = process.env.PORT || 3000;
const auth = require("./mw/auth");
require('dotenv').config();

//User Controller
const {showUsers, showUser} = require('./db/dbuser');
const {registerUser} = require('./db/dbuser');
const {loginUser} = require('./db/dbuser');
const {deleteUser} = require('./db/dbuser');
const {loginOut} = require('./db/dbuser');


//Appointment Controller
const {showAppointments} = require('./db/dbappointments');
const {reserveAppointment} = require('./db/dbappointments');
const {deleteAppointment} = require('./db/dbappointments');
const {cancelAppointment} = require('./db/dbappointments');


//Middleware
app.use(express.json());
app.use(cors);

//db connection
const dbconnect = require('./config/dbconnect');

dbconnect();


//User Actions
app.get('/users/showall', showUsers);
app.get('/user', showUser);
app.post('/users/register', registerUser);
app.post('/users/login', loginUser);
app.get('/users/logout', loginOut);
app.delete('/users/goodbye', auth, deleteUser);

//Appointments Actions
app.get('/appointments/showall', showAppointments);
app.post('/appointments/reserves', reserveAppointment);
app.delete('/appointments/remove/:id', deleteAppointment);
app.put('/appointments/cancel/:id', auth,cancelAppointment);

app.listen(PORT, ()=> console.log('Server working'));