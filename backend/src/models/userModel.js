const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// dotenv.config();

const UserModel = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        // minlength: 3,
        // maxlength: 50,
        // message: "First Name must be between 3 and 50 characters",
    },
    lastName: {
        type: String,
        // minlength: {value: 3, message: "Last Name must be at least 3 characters"},
        // maxlength: {value: 50, message: "Last Name must be less than 50 characters"},
    },
    email: {
        type: String,
        required: true,
        unique: true,
        // minlength: {value: 3, message: "Email must be at least 3 characters"},
        // maxlength: {value: 50, message: "Email must be less than 50 characters"},
        // match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address"],
    },
    password: {
        type: String,
        required: true,
        // minlength: 8,
        // message: "Password must be between 8 and 50 characters",
    },
    age: {
        type: Number,
        required: true,
        // min: {value: 15, message: "Age must be at least 15"},
        // max: {value: 100, message: "Age must be less than 100"},
    },
    gender: {
        type: String,
        default: "male",
        enum: ["male", "female", "other"],
        // message: "Gender must be either male, female or other",
    },
    phoneNumber: {
        type: String,
        // minlength: {value: 10, message: "Phone Number must be at least 10 characters"},
        // maxlength: {value: 15, message: "Phone Number must be less than 15 characters"},
        // match: [/^[0-9]{10}$/, "Please enter a valid phone number"],
    },
    address: {
        type: String,
        
    },
    skills: {
        type: [String],
        required: true,
        // minlength: {value: 1, message: "Skills must be at least 1 skill"},
        // maxlength: {value: 10, message: "Skills must be less than 10 skills"},
    },
}, {timestamps: true})


//  UserModel.methods.hashPassword = function() {
//     const hashPassword = bcrypt.hash(this.password, 10);

//     this.password = hashPassword;
// }

UserModel.pre("save", async function (next) {
    if (!this.isModified("password")) return next(); 

    try {
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        next();
    } catch (err) {
        next(err); 
    }
});

UserModel.methods.comparePassword = function(password) {
    const isMatch = bcrypt.compare(password, this.password);
    return isMatch;
}

UserModel.methods.generateToken = function() {
    const token = jwt.sign({id: this._id}, process.env.JWT_SECRET, {expiresIn: "1d"});
    return token;
}



const User = mongoose.model("User", UserModel);

module.exports = User;