const express = require('express')
const router = express.Router();
const {authMiddleware} = require("../middleware/authMiddleware")
const {createUser, loginUser, userAuthentication, addAddress, deleteAddressByIndex} = require("../controllers/userController")

//create user
router.post("/createUser", createUser);

router.post("/login", loginUser);

//verifing identity
router.get("/me",authMiddleware, userAuthentication)

//adding address to user schema
router.put("/add-address", authMiddleware, addAddress);

// Delete an address by index
router.put("/delete-address", authMiddleware, deleteAddressByIndex);

module.exports = router;