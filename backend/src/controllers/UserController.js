const User = require("../models/userModel");



const getProfile = async (req, res) => {
    try {
        const userId = req.id;
        if (!userId) {
            return res.status(401).json({ message: "please go to Login", success: false });
        }
        const user = await User.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }
        return res.status(200).json({ message: "User profile fetched successfully", success: true, user });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", success: false });
        console.log(error);
    }
}

const updateProfile = async (req, res) => {

    try {
        const userId = req.id;
        const { firstName, lastName, email, age, skills, gender, phoneNumber, address, profilePicture } = req.body;
        if (!userId) {
            return res.status(401).json({ message: "please go to Login", success: false });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }
        const updatedUser = await User.findByIdAndUpdate(userId, {
            firstName: firstName || user.firstName,
            lastName: lastName || user.lastName,
            email: email || user.email,
            age: age || user.age,
            skills: skills || user.skills,
            gender: gender || user.gender,
            phoneNumber: phoneNumber || user.phoneNumber,
            address: address || user.address,
            profilePicture : profilePicture || user.profilePicture
        }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: "Unable to update profile", success: false });
        }
        return res.status(200).json({ message: "User profile updated successfully", success: true, updatedUser });

    } catch (error) {
        res.status(500).json({ message: "Internal server error", success: false });
        console.log(error);
    }
}
module.exports = { getProfile, updateProfile }; 