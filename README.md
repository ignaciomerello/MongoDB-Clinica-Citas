# MongoDB-Clinica-Citas
DATABASE BUILD IN MONGO USING ODM MONGOOSE


GeeksHubs Academy MongoDB - Mongoose ODM Project

This project is a BackEnd of a Clinic where a patient "user" can Register and Login in order to schedule an appointment that could be modifyed afterwards.


To check the deployed version of the BackEnd you can visit the following link:

[Deployed App in Heroku servers](https://clinic-appointments-mongodb.herokuapp.com/)




## Languages and technologies used in the project:

* Javascript
* Node
* Express
* MongoDB
* Mongoose

DB Accessibility application programs involved:
* MongoDB Cloud Atlas
* Heroku




### Dependencies installed:

- Bcrypt
- Bcryptjs
- Dotenv
- Express
- Jsonwebtoken
- Moment
- Mongoose (ODM)


### Configuration file "dbconnect.js"

This is an example of URI needed in order to connect to the MongoDB server.  

```js
    const uri = "mongodb+srv://Ignacio-Merello:xxx@cluster0.8wyqg.mongodb.net/xxx?retryWrites=true&w=majority";
```

### Models

The Users will need a role from wich they will be capable of accessing the data depending on ther level of authorization

Example:

```js

    role:{
        type:String,
        enum:['Patient','Doctor','Administrative','Administrator'],
        required:true
    },

```

# End Points

```js

//User Actions
app.get('/users/showall', auth, showUsers); //Authorization Required to Access to the Users Registered
app.post('/users/register', registerUser);
app.post('/users/login', loginUser);
app.get('/users/logout', loginOut);
app.delete('/users/goodbye', auth, deleteUser);

//Appointments Actions
app.get('/appointments/showall', auth, showAppointments);
app.post('/appointments/reserves', auth, reserveAppointment);
app.delete('/appointments/remove/:id', auth, deleteAppointment);
app.put('/appointments/cancel/:id', auth, cancelAppointment);
```


### Here you can see the use of Git Flow to develop the project:

#### Git Flow Graph
![alt text](/img/Git_Flow_Graph.png "Git Flow Graph")



## Documentation

- [MongoDB](https://docs.mongodb.com/)
- [Mongoose](https://mongoosejs.com/docs/guide.html)

- [Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs
)

- [Git Flow](https://danielkummer.github.io/git-flow-cheatsheet/)


## Author 

* **Ignacio Merello lloret** - [ignaciomerello](https://github.com/ignaciomerello)

