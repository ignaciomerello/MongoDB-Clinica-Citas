const UserModel = require('../models/User');

const mongoose = require('mongoose');

const fs = require('fs');

const showUsers = (req, res) => {
    UserModel.find({})
        .then(users => {
            res.send(users)
        })
        .catch(error => (error));
};
const registerUser = async (req,res) => {
    
    let bodyData = req.body;

    try {
        const user = await new UserModel({
            username: bodyData.username,
            email: bodyData.email,
            password: bodyData.password
        }).save();

        res.send({
            message: "Account created",
            username: user.username,
            email: user.email,
            password: user.password
        });
        
    } catch (error) {

        res.send(error);
        
    };
};

module.exports = {
    showUsers,
    registerUser
};