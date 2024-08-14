const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
            if (err) {
                console.error('JWT verification error:', err);
                return res.status(403).json({ error: 'Invalid or expired token' });  // More descriptive
            }

            if (!user || !user.userId) {
                console.error('JWT token does not contain userId');
                return res.status(403).json({ error: 'Invalid token data' });  // More descriptive
            }

            req.user = user;  // Attach user info to req
            next();
        });
    } else {
        console.error('No Authorization header provided');
        res.status(401).json({ error: 'Authorization header is missing' });  // More descriptive
    }
};

module.exports = authenticateJWT;
