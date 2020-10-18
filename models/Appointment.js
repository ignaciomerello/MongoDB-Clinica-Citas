const moment = require("moment");
const mongoose = require("mongoose");

const AppointmentSchema = mongoose.Schema({

    
    date:{
        type:Date,
        required:true
    },
    
    state:{
        type:String,
        default:'taken',
        enum:['taken','cancelled','available']
    },
    
    title:{
        type:String,
        required:true
    },

    description:{
        type:String,
    },

    userId: {
        type:String,
        required:true
    },
});

const AppointmentModel = mongoose.model('appointment', AppointmentSchema);

module.exports = AppointmentModel;