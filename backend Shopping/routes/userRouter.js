const express = require('express')
const router = express.Router();
const {authMiddleware} = require("../middleware/authMiddleware")
const {createUser, loginUser, firebaseLogin, userAuthentication, addAddress, deleteAddressByIndex, logout} = require("../controllers/userController")

//create user
router.post("/createUser", createUser);

router.post("/login", loginUser);

router.post("/firebase-login",firebaseLogin)

//verifing identity
router.get("/me",authMiddleware, userAuthentication)

router.post("/logout", logout)

//adding address to user schema
router.put("/add-address", authMiddleware, addAddress);

// Delete an address by index
router.put("/delete-address", authMiddleware, deleteAddressByIndex);

module.exports = router;