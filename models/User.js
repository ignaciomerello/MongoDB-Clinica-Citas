const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({

    username:{
        type:String,
        required:true //Indisplensable
    },

    email:{
        unique:true,
        type:String,
        required:true //Indisplensable sequelize "AllowNull = false;"
    },

    password:{
        type:String,
        required:true //Indisplensable sequelize "AllowNull = false;"
    },

    role:{
        type:String,
        enum:['Patient','Doctor','Administrative','Administrator'],
        required:true //Indisplensable sequelize "AllowNull = false;"
    },


});

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;