import jwt from 'jsonwebtoken';

const { JWT_SECRET } = process.env;

const authenticateToken = (req, res, next) => {
    // console.log(req.cookies);
    console.log("Raw Cookies Header:", req.headers.cookie);
    console.log("Parsed Cookies:", req.cookies);
    const token = req.cookies.token;
    console.log("token from cookies: ", token);
    if (!token) {
        return res.status(401).json({
            message: "Authentication Failed. Please Logged in again,"
        })
    }

    jwt.verify(token, JWT_SECRET, (error, decoded) => {
        if (error) {
            return res.status(401).json({
                message: "Invalid or expired token"
            })
        }
        req.user = decoded;
        next();
    })
}

export default authenticateToken;