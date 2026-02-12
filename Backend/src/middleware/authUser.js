import jwt from 'jsonwebtoken'
import 'dotenv/config'

// user Authentication middleware
const authUser = async (req, res, next) => {
    try {
        const { usertoken } = req.headers
        if (!usertoken) {
            return res.json({ success: false, message: "Not Authorized Login Again" })
        }
        const token_decode = jwt.verify(usertoken, process.env.JWT_SECRET_KEY);

        if (!req.body) {
            req.body = {};
        }

        req.body.userId = token_decode.id

        next();

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

export default authUser;