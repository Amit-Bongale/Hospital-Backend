const jwt = require('jsonwebtoken');

const VerifyToken = (req, res, next) => {

    let token = req.cookies?.token || req.headers?.authorization || req.headers?.Authorization;
    // console.log("token:", token)

    // auth tokin in api header(authorization) 
    if (token && token.startsWith('Bearer ')) {
        token = token.split(' ')[1]; // Remove "Bearer " prefix
    }

    if(!token) {
        return res.status(401).json({ success: false, message: 'please Login' });
    }

    try {
        let decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }

        req.user = decoded;
        next();
        
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
}

module.exports = VerifyToken;