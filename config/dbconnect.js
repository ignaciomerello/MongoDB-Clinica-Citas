const dbconnect = () => {

    const mongoose = require('mongoose');
    const uri = "mongodb+srv://Ignacio-Merello:19Norelacional84!@cluster0.8wyqg.mongodb.net/clinicaMerello?retryWrites=true&w=majority";
    
    mongoose.connect(uri, {
    
        useNewUrlParser: true,
    
        useUnifiedTopology: true,
    
        useCreateIndex: true,
    
        useFindAndModify: false
    
    }).then(() => {
        console.log('Connection Established')
    })
    .catch(error => console.error('Error connecting' + error));
    
    }
    
    module.exports = dbconnect;
    