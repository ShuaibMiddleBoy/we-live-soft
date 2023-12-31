const express = require('express');
const { registerController, loginController } = require('../controllers/authControllers');
const { requireSignIn, isAdmin } = require('../middlewares/authMiddleware');

// Router Object 
const Router = express.Router();


// Routing 

// REGISTER ROUTER || POST METHOD
Router.post('/register', registerController);

// LOGIN ROUTER || POST METHOD
Router.post('/login', loginController);

Router.get('/test', requireSignIn, isAdmin, (req,res)=>{
    res.send('Protected Route')
})
module.exports = Router;