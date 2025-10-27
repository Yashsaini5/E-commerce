const User = require("../models/user");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const admin = require("../config/firebaseAdmin");

const createUser = async (req, res) => {
  const { username, email, password } = req.body;

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ errusername: "username already exists!" });
  }
  const existingEmail = await User.findOne({ email });
  if (existingEmail) {
    return res.status(400).json({ erremail: "Account already exists! " });
  }

  if (!password) {
    return res
      .status(400)
      .json({ error: "Password is required for local login." });
  }

  const salt = await bcrypt.genSalt(10);
  const encriptedPassword = await bcrypt.hash(password, salt);
  // Store hash in your password DB.

  const createdUser = await User.create({
    username: username,
    email: email,
    password: encriptedPassword,
  });

  var token = jwt.sign({ id: createdUser._id }, process.env.JWT_SECRET);
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none", 
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });

  res.status(200).json(createdUser);
};

const loginUser = async (req, res) => {
  const { loginId, password } = req.body;

  const existingUser = await User.findOne({
    $or: [{ email: loginId }, { username: loginId }],
    //$or -> mongodb query operator that allow to search for documents that matches at least 1 of given condition
  });

  if (!password) {
    return res
      .status(400)
      .json({ error: "Password is required for local login." });
  }

  const isPasswordMatch = await bcrypt.compare(password, existingUser.password);

  if (!existingUser || !isPasswordMatch) {
    return res.status(400).json({ message: "wrong ID or Password" });
  }

  var token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET);
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none", 
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });

  res.status(200).json(existingUser);
};

const firebaseLogin = async (req, res) => {
  try {
    const { token } = req.body;
    const decode = await admin.auth().verifyIdToken(token);

    const { email, name, uid } = decode;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        username: name || email.split("@")[0],
        email,
        password: null,
        authProvider: "firebase",
        firebaseUid: uid,
      });
    }

    var jwttoken = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.cookie("token", jwttoken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });
    res.status(200).json(user);
  } catch (error) {
    console.error("Firebase login error:", error);
    res.status(400).json({ message: "Firebase login failed" });
  }
};

const userAuthentication = async (req, res) => {
  try {
    const user = await User.findById(req.user).select("-password");
    if (!user) return res.status(404).json({ message: "user not found" });
    res.status(200).json(user);
  } catch {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const logout = async (req, res) => {
   res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  res.status(200).json({ message: "Logged out successfully" });
}

const addAddress = async (req, res) => {
  try {
    const userId = req.user;
    const newAddress = req.body;
    // console.log(userId, newAddress)

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.addresses.push(newAddress);
    await user.save();

    res.json(user); // Send updated user with new address
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add address" });
  }
};

const deleteAddressByIndex = async (req, res) => {
  try {
    const userId = req.user;
    const { index } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (index < 0 || index >= user.addresses.length) {
      return res.status(400).json({ message: "Invalid index" });
    }

    user.addresses.splice(index, 1);
    await user.save();

    res.json(user); // Send updated user after deletion
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete address" });
  }
};

module.exports = {
  createUser,
  loginUser,
  firebaseLogin,
  userAuthentication,
  logout,
  addAddress,
  deleteAddressByIndex,
};
