const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({

    username:{
        type:String,
        required:true
    },

    email:{
        unique:true,
        type:String,
        required:true
    },

    password:{
        type:String,
        required:true
    },

    role:{
        type:String,
        enum:['Patient','Doctor','Administrative','Administrator'],
        required:true
    },
    
    token:{
        type:String,
        default:'',
    },


});

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;