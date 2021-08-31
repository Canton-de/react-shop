const Router = require('express');
const authController = require('../controllers/auth.controller');
const { User } = require('../models/User');
const { check, validationResult } = require('express-validator');
const authMiddleware = require('../middlewares/auth.middleware');

const userRouter = Router()

userRouter.post('/sign-up',[
        check('email','Invalid email').isEmail(),
        check('password','Password min is 3, max is 12').isLength({min:3,max:12}),
        check('name','Name is min 2 max 15').isLength({min:2,max:15}),
    ],authController.register)

userRouter.post('/sign-in',authController.login)
userRouter.get('/login',authMiddleware,authController.auth)
    
module.exports = userRouter