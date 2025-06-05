var jwt = require('jsonwebtoken');
const User = require('../models/user');

const authMiddleware = (req, res, next) => {
    // console.log("Cookies received:", req.cookies); // 
    // console.log(req.cookies.token)
    if (!req.cookies || !req.cookies.token) {
        return res.status(401).json({ message: "No token found, authorization denied" });
    }
    const token = req.cookies.token
        try{
            const decode = jwt.verify(token, process.env.JWT_SECRET)
            req.user = decode.id;
            // console.log(req.user);
            next();
        }catch(error){
            res.status(403).json({message: "invalid token"})
        }
}
const isAdminMiddleware = async (req, res, next) => {
  try {
    // authMiddleware should already have put the user’s _id on req.user
    const user = await User.findById(req.user).select("role");

    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    next();
  } catch (err) {
    console.error("Admin check failed:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {authMiddleware, isAdminMiddleware};
