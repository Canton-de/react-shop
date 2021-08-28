const bcrypt = require('bcrypt');
const User = require('../models/User');
const {  validationResult } = require('express-validator');
const jwt = require('jsonwebtoken')
const config = require('config')
const Cart = require('../models/CartModel');

class AuthController {
    async register (req,res) {
        try{
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
              return res.status(400).json({ errors: errors.array() });
            }
            const {email,name,password,type} = req.body;
            const candidate = await User.findOne({email})
            if(candidate) {
                return res.status(401).send({message:"user  already exists"})
            }
            const hashedPassword = await bcrypt.hash(password,7)
            const user = new User({
              email,
              name,
              password: hashedPassword,
              type
            });
            await user.save()
            const cart = new Cart({
                user:user._id
            })
            await(cart.save())
            res.send({user,token:jwt.sign({id:user._id},config.get('secretKey')),cart}); 
        }catch(e){
            console.log(e)
            res.status(500).send({message:e})
        }
    }

    async login (req,res) { 
        try {
            const {email,password} = req.body
            const candidate = await User.findOne({email})
            if(!candidate) return res.status(401).send({message:"user was not found"})
            const isPasswordCorrect = await bcrypt.compare(password,candidate.password);
            if(!isPasswordCorrect) return res.status(401).send({message:'incorrect password'})
            res.send(candidate)
        }catch(e) {
            console.log(e)
            res.status(500).send({message:e})
        }
    }

    async auth (req,res) { 
        try {
            if(!req.user) return res.status(401).send({message:'not authorized'})
            const {id} = req.user
            const candidate = await User.findById(id);
            if(!candidate) return res.status(404).send({message:'user not found'})
            res.send(candidate)
        }catch(e) {
            console.log(e)
            res.status(500).send({message:e})
        }
    }
}



module.exports = new AuthController