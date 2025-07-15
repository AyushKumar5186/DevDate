const express = require("express");
const User = require("../models/userModel");
const { validateSignUpData } = require("../configs/validate");


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

module.exports = {signup};