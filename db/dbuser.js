const UserModel = require('../models/User');

const mongoose = require('mongoose');

const bcrypt = require("bcryptjs");

const fs = require('fs');

const showUsers = (req, res) => {
    UserModel.find({})
        .then(users => {
            res.send(users)
        })
        .catch(error => (error));
};
const registerUser = async (req, res) => {

    let bodyData = req.body;

    try {
        const user = await new UserModel({
            username: bodyData.username,
            email: bodyData.email,
            password: bodyData.password,
            role: bodyData.role
        }).save();

        res.send({
            message: "Account created",
            username: user.username,
            email: user.email,
            password: user.password,
            role: bodyData.role

        });

    } catch (error) {

        res.send(error);

    };
};

let loginUser = async (req, res) => {

    let userFound = await UserModel.findOne({
        email: req.body.email
    });

    if (!userFound) {
        res.send({
            message: "No existe el usuario"
        });
    } else {

        let passwordOk = await bcrypt.compare(req.body.password, userFound.password);

        if (passwordOk) {
            res.send({
                name: userFound.username,
                email: userFound.email
            });
        } else {
            res.send({
                message: "Credenciales incorrectas"
            });
        };

    };

};

const deleteUser = async (req, res) => {
    
    let id = req.body.id;

	UserModel.findByIdAndDelete(
		id
	).then ( (userDeleted) => {
		
		if (userDeleted) {
			res.send({
				message: `User ${userDeleted.id} borrado con éxito: Usuario: ${userDeleted.username} email: ${userDeleted.email}`
			});
		} else {
			res.status(404);
			res.send({
				error: `Usuario con el id ${id} no encontrado.`
			})
		};
		
	}).catch( (err) => {
		console.log( err );
	});
};


module.exports = {
    showUsers,
    registerUser,
    loginUser,
    deleteUser
};