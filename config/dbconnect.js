// mongo "mongodb+srv://cluster0.8wyqg.mongodb.net/<clinicaMerello>" --username Ignacio-Merello
// mongoose.connect('mongodb://localhost:27017/db-ejemplo', {

// const mongoose = require('mongoose');
// mongoose.connect('mongodb+srv://cluster0.8wyqg.mongodb.net/<clinicaMerello>', {
// useNewUrlParser: true,
// useUnifiedTopology: true,
// useCreateIndex: true,
// useFindAndModify: false
// });
// module.exports = mongoose;

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
    