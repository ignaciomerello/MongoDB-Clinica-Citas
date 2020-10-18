const moment = require("moment");
const mongoose = require("mongoose");

const AppointmentSchema = mongoose.Schema({

    userId: {
        type:String,
        required:true
    },

    date:{
        type:String,
        required:true
    },

    state:{
        type:String,
        default:'taken',
        enum:['taken','cancelled','available']
    }

});

const AppointmentModel = mongoose.model('appointment', AppointmentSchema);

module.exports = AppointmentModel;