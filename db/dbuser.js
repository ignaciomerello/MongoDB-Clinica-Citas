const UserModel = require('../models/User');

const mongoose = require('mongoose');

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const fs = require('fs');
const auth = require('../mw/auth');

const showUsers = (req, res) => {
    UserModel.find({})
        .then(users => {
            res.send(users)
        })
        .catch(error => (error));
};

const showUser = (req, res) => {
    UserModel.findOne({})
        .then(users => {
            res.send(users)
        })
        .catch(error => (error));
};
const registerUser = async (req, res) => {

    let bodyData = req.body;
    bodyData.password = await bcrypt.hash(bodyData.password, 9);
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
            const token = jwt.sign({
                id: userFound.id
            }, process.env.SECRET_AUTH_JWT, {
                expiresIn: '30d'
            });
            userFound.token = token;
            await userFound.save()
            res.send({
                token: userFound.token,
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
let loginOut = async (req, res) => {

    // eleminar token
    const authorization = req.headers.authorization;
    if (!authorization){
       return res.status(400).send({message:"Token not Found in headers"});
    }

    const token = authorization.split(' ')[1];

    let userFound = await UserModel.findOne({
        token:token
    });

    if (!userFound){
        return res.status(400).send({message:"User alredy logged out"});
    }

    userFound.token="";

    await userFound.save();

    res.send({
        message: "User Logged Out succesfully"
    });

};

const deleteUser = async (req, res) => {

    let id = req.body.id;

    UserModel.findByIdAndDelete(
        id
    ).then((userDeleted) => {

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

    }).catch((err) => {
        console.log(err);
    });
};


module.exports = {
    showUsers,
    registerUser,
    loginUser,
    deleteUser,
    loginOut,
    showUser
};