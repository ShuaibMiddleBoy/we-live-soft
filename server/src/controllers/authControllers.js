const usersModel = require("../models/userModel");
const {hashPassowrd, comparePassword} = require('../helpers/authHelper');
const jwt = require('jsonwebtoken');

// Controllers 


// REGISTRATION CONTROLLERE || POST
const registerController = async (req, res) => {
    try {
        const {name, email, phone, password, confirmPassword} = req.body;
        if(!name){
            res.send("Name is required..");
        }
        if(!email){
            res.send("Email is required..");
        }
        if(!phone){
            res.send("Phone is required..");
        }
        if(!password){
            res.send("Password is required..");
        }
        if(!confirmPassword){
            res.send("Confirm Passowrd is required..");
        }

        // check password and confirm password 
        if(password != confirmPassword){
            res.send('Password and Confirm Password were not same ');
        }

        const existingUser = await usersModel.findOne({email});
        if(existingUser){
            res.status(404).send({
                success : false,
                message : "User Already Registered Please Login",
            })
        }

       
        const hashedPassowrd = await hashPassowrd(password);
        
       

        const user = await usersModel({name, email, phone, password:hashedPassowrd}).save();

        //  jwt token
        const token = await jwt.sign({_id:user._id}, process.env.JWT_SECRET_KEY, {expiresIn:'7d'}) 
        
        res.status(201).json({
            success : true,
            message : "User Registered Successfully",
            user : {
                name : user.name,
                email : user.email,
                phone : user.phone,
                role : user.role
            },
            token
        })
        
    } catch (error) {
       console.log(error);
       res.status(500).json({
        success : false,
        message : "Error in registration",
        error
       }) 
    }
}


// LOGIN CONTROLLER || POST 
const loginController = async (req, res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password){
            res.status(404).json({
                success : false,
                message : "Invalid email or password"
            })
        }

        user = await usersModel.findOne({email});
        if(!user){
            return res.status(404).send({
                success : false,
                message : "Email is not registered"
            })
        }

        const matchPassword = await comparePassword(password, user.password);

        if(!matchPassword){
            return res.status(404).send({
                success : false,
                message : "Invalid Password"
            })
        }

        //  jwt token
        const token = await jwt.sign({_id:user._id}, process.env.JWT_SECRET_KEY, {expiresIn:'7d'}) 

        res.status(201).json({
            success : true,
            message : "Login Successfully",
            user : {
                name : user.name,
                email : user.email,
                phone : user.phone,
                role : user.role
            },
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success : false,
            message : "Error in login",
            error
        })
    }
}


module.exports = {registerController, loginController}