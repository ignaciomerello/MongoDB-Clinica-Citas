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

    try {

        const bodyData = req.body;

        const user = await new UserModel({
            //req.body metodo pinilla
            username: bodyData.username,
            email: bodyData.email,
            password: bodyData.password
        }).insertOne();//create() tambien lo inserta (metodo pinilla)
        res.send(console.log("no llega"));
        res.send({
            message: "Account created",
            username: user.username
            // email: user.email,
            // password: user.password
        })
        
    } catch (error) {

        res.send(error);
        
    }
};

module.exports = {
    showUsers,
    registerUser
};