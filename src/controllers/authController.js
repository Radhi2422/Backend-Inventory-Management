const User = require("../models/User");
const Role = require("../models/Role");
const Permission=require("../models/Permission.js")
const bcrypt=require("bcrypt");
const jwt = require("jsonwebtoken");
exports.login = async (req, res) => {
  try {

    const { userId, password } = req.body;

        const user = await User.findOne({ userId });
        console.log("user",user.role);
        if (!user) {
          return res.status(401).json({
            success: false,
            message: "User not found"
          });
        }

        const isPasswordValid = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!isPasswordValid){
          // console.log(password, user.password);
          return res.status(401).json({
            success: false,
            message: "Invalid Password"
          });
        }
const token=jwt.sign({ id:user._id },process.env.JWT_SECRET,{ expiresIn:"8h" });
        res.status(200).json({
          success: true,
          message: "Login Successful",
          role:user.role,
          token
        });

    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
};