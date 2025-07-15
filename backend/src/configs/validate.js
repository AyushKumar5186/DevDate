const validator = require("validator");

 const validateSignUpData = (data)=> {
    try {

        const dataRequired = ["firstName", "email", "password", "age", "skills"];

        dataRequired.forEach(field => {
            if(!data[field]){
                return ({message: `${field} is required`, success: false});
            }
        })

        if(data.age < 15 || data.age > 100){
            return ({message: "Age must be at least 15 and less than 100", success: false});
        }

        if(data.skills.length < 1 || data.skills.length > 10){
            return ({message: "Skills must be at least 1 skill and less than 10 skills", success: false});
        }

        if(data.password.length < 8){
            return ({message: "Password must be at least 8 characters", success: false});
        }
        if(!validator.isStrongPassword(data.password)){
            return ({message: "Please enter a strong password", success: false});
        }

        if(data.email.length < 3 || data.email.length > 50){
            return ({message: "Email must be at least 3 characters and less than 50 characters", success: false});
        }

        if(!validator.isEmail(data.email)){
            return ({message: "Please enter a valid email address", success: false});
        }

        if (!data.firstName || data.firstName.length < 3 || data.firstName.length > 50) {
            return {
                message: "First Name must be at least 3 characters and less than 50 characters",
                success: false
            };
        }

        return ({message: "User signed up successfully", success: true});
    }
 catch (error) {
        console.log(error);
        return ({message: error.message, success: false})   ;
    }
}

module.exports = {validateSignUpData};