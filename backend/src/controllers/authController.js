const express = require("express");
const User = require("../models/userModel");
const { validateSignUpData, validateLoginData } = require("../configs/validate");


 const signup = async (req, res) => {
    const data = req.body;

    try {

        const validateData = validateSignUpData(data);

        if (validateData.success) {         
            if(await User.findOne({email: data.email})){
                return res.status(400).json({message: "Email already exists", success: false});
            }

            const user = await User.create(data);

            return res.status(201).json({message: validateData.message, success: validateData.success, user});
        } else {
            return res.status(400).json({message: validateData.message, success: validateData.success});
        }
    } catch (error) {
        res.status(500).json({message: "Internal server error", success: false});
        console.log(error);
    }
}      

const login = async (req, res) => {
    const data = req.body;

    try {
        const validateData = validateLoginData(data);

        if(validateData.success){
            const user = await User.findOne({email: data.email});

        if(user){
            const isPasswordCorrect = await user.comparePassword(data.password);

            if(isPasswordCorrect){
                const token = user.generateToken();
                res.cookie("token", token, {maxAge: 24 * 60 * 60 * 1000});
                return res.status(200).json({message: validateData.message, success: validateData.success, user, token});
            } else {
                return res.status(400).json({message: "Invalid email or password", success: false});
            }
        } else {
            return res.status(400).json({message: "Invalid email or password", success: false});
        }
        } else {
            return res.status(400).json({message: validateData.message, success: validateData.success});
        }


    } catch (error) {
        res.status(500).json({message: "Internal server error", success: false});
        console.log(error);
    }
}

const logout = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.status(200).json({message: "User logged out successfully", success: true});
    } catch (error) {
        res.status(500).json({message: "Internal server error", success: false});
        console.log(error);
    }
}

module.exports = {signup, login, logout};