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

function hasPermission(permission) {
    return function (req, res, next) {
        const user = req.user;
        const role = user.role;
        if (role.permissions.includes(permission)) {
            next();
        } else {
            res.status(403).send({ error: 'Forbidden' });
        }
    };
}

module.exports = {authenticateToken, hasPermission};