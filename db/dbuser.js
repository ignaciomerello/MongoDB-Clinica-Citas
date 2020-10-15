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


module.exports = {
    showUsers
};