const express = require('express')
const router = express.Router()

const jwt = require('jsonwebtoken')


// Verify user Roles in Frontend for Protected Routes

router.post("/user", (req, res) => {
  const token = req.cookies?.token
  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if(!decoded) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    res.status(200).json({id: decoded.id, role: decoded.role, name: decoded.name , LoggedIn: true });

    console.log("User verified:", decoded);

  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
});

module.exports = router