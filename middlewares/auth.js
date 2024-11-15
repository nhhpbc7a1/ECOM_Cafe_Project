import jwt from 'jsonwebtoken';

export function authenticateToken(req, res, next) {
    const token = req.cookies.authToken;
    if (!token) {
        return res.redirect('/manager/login');
    }

    jwt.verify(token, 'secretKey', (err, user) => {
        if (err) return res.redirect('/manager/login');
        req.user = user;
        next();
    });
}
