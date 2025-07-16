const jwt = require("jsonwebtoken");


const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies?.token;
        // console.log(token);
        if (!token) {
            return res.status(401).json({ message: "please go to Login", success: false });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ message: "Invalid token", success: false });
        }
        req.id = decoded?.id;
        next();
    } catch (error) {
        res.status(500).json({ message: "Internal server error", success: false });
        console.log(error);
    }
}

module.exports = authMiddleware;