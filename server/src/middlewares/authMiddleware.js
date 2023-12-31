const jwt = require('jsonwebtoken');
const usersModel = require('../models/userModel');


const requireSignIn = async (req, res, next) => {
    try {
        const decoded =  jwt.verify(req.headers.authorization, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next(); 
    } catch (error) {
        console.log(error);
    }
}


const isAdmin = async (req, res, next) => {
    try {
        const user = await usersModel.findById(req.user._id)
        if(user.role !== 1){
            res.status(404).send({
                success : false, 
                message : "Unauthorized"
            })
           
        } else{
            next()
        }
        next()
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false, 
            message : "Error in admin Middelrware",
            error
        })
    }
}

module.exports = {requireSignIn, isAdmin}