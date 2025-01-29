const User= require("../models/userModel");
const validator = require('validator');
const jwt =require('jwt')


const signToken=(id)=>{
    return jwt.sign( {id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    })
}

const createSendToken=(user,statusCode,res)=>{
    const token =signToken(user._id);
    res.status(statusCode).json({status:"Success",
        token,
        data:{
            user, 

        }
    })


}

exports.signup= async(req,res)=>{
    try{
        const emailCheck= await User.findOne({email:req.body.email});
        if (emailCheck){
            return res.status(409).json({message:"Email is in use."})
        }


        if (!validator.isEmail(req.body.email)){
            return res.status(400).json({message:"Invalid Email."})
        }


        if (req.body.password !== req.body.passwordConfirm){
            return res.status(400).json({message:"Password and password confirm don't match"})
        }

        const newUser = await User.create({
            firstName,
            lastName,
            email,
            username,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm, 
            role:req.body.role,
        })


        return res.status(201).json({message:"New user Created" ,
            data:{
                    newUser,
            }
        })


        createSendToken(newUser, 201,res);

    }catch(err){
        res.status(500).json({message:err.message});
        console.log(err)
    }
}