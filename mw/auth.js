const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.SECRET_AUTH_JWT);
        const user = await User.findOne({
                token: token
        });
        if (!user) {
            return res.status(401).send({
                message: 'You are not authorized'
            })
        }
        req.user = user;
        next();
    } catch (error) {
        console.error(error)
        res.status(200).send({
            error,
            message: 'You are doomed!!!'
        })
    }
}
module.exports = auth;