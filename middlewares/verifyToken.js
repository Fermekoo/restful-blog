const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const authHeader = req.header('Authorization');
    if(!authHeader) return res.status(401).json({message: 'access denied'});

    const token = authHeader.split(' ')[1];
    
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; //asign user login to req variabe
        next();
    } catch (error) {
        res.status(400).json({message: 'invalid token'});
    }
}