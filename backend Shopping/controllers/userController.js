const User = require('../models/user');
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

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

  const salt = await bcrypt.genSalt(10);
  const encriptedPassword = await bcrypt.hash(password, salt);
  // Store hash in your password DB.

  const createdUser = await User.create({
    username: username,
    email: email,
    password: encriptedPassword,
  });
  res.send(createdUser);
  // res.redirect('http://localhost:5173/')
}

const loginUser = async (req, res) => {
  const { loginId, password } = req.body;

  const existingUser = await User.findOne({
    $or: [{ email: loginId }, { username: loginId }],
    //$or -> mongodb query operator that allow to search for documents that matches at least 1 of given condition
  });

  const isPasswordMatch = await bcrypt.compare(password, existingUser.password);

  if (!existingUser && !isPasswordMatch) {
    return res.status(400).json({ message: "wrong ID or Password" });
  }

  var token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET);
  res.cookie("token", token);

  res.send({ message: "logged in successfully" });
}

const userAuthentication = async (req, res) => {
      try{
            const user = await User.findById(req.user).select("-password")
            if(!user) return res.status(404).json({message:"user not found"})
                res.status(200).json(user) 
        }catch{
            console.error("Error fetching user:", error);
            res.status(500).json({ message: "Server error" });
        }
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
}

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
}

module.exports = {createUser, loginUser, userAuthentication, addAddress, deleteAddressByIndex}