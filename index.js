const express = require('express');
const app = express();
const cors = require('./mw/cors');

//User Controller
const {showUsers} = require('./db/dbuser');
const {registerUser} = require('./db/dbuser');
const {loginUser} = require('./db/dbuser');
const {deleteUser} = require('./db/dbuser');


//Appointment Controller
const {showAppointments} = require('./db/dbappointments');
const {reserveAppointment} = require('./db/dbappointments');
const {deleteAppointment} = require('./db/dbappointments');
const {cancelAppointment} = require('./db/dbappointments');


//Middleware
app.use(express.json());

//db connection
const dbconnect = require('./config/dbconnect');

dbconnect();


//User Actions
app.get('/users/showall', showUsers);
app.post('/users/register', registerUser);
app.post('/users/login', loginUser);
app.delete('/users/goodbye', deleteUser);

//Appointments Actions
app.get('/appointments/showall', showAppointments);
app.post('/appointments/reserves', reserveAppointment);
app.delete('/appointments/remove', deleteAppointment);
app.put('/appointments/cancel', cancelAppointment);


app.listen(3000, ()=> console.log('Server working'));