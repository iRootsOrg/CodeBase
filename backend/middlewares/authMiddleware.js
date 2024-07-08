const jwt = require("jsonwebtoken")

function authenticateToken(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];

    if(!token){
        return res.status(401).json({
            message: 'Unauthorized. Token missing.'
        });
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch(err) {
        return res.status(403).json({
            message: 'Invalid Token.'
        })
    }
}

module.exports = authenticateToken;