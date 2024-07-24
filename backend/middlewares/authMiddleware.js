const jwt = require("jsonwebtoken")
const CustomError = require("../utils/CustomError.js");

function authenticateToken(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];

    if(!token){
        throw new CustomError('Unauthorized. Token missing.', 401);
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (err) {
        if (err.name === 'JsonWebTokenError') {
            return next(new CustomError('Invalid token.', 403));
        } else if (err.name === 'TokenExpiredError') {
            return next(new CustomError('Token expired.', 401));
        } else {
            return next(new CustomError('Authentication failed.', 500));
        }
    }

}

module.exports = authenticateToken;