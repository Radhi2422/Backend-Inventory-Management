const User = require("../models/User");
const Role = require("../models/Role");
const Permission=require("../models/Permission.js")
const bcrypt=require("bcrypt");
const jwt = require("jsonwebtoken");



exports.login=async(req,res)=>{
    try{
        const {userId,password}=req.body;
        const user_name=await User.findOne({userId});
        //Name is database
        if(!user_name){
            return res.status(401).json({
                success:false,
                message : "User Not registered",
            });
        }
        //Password is correct
        // console.log("Name",user_name.password);
        const isPasswordValid=await bcrypt.compare(
            req.body.password,
            user_name.password
        )
        if(!isPasswordValid){
            return res.status(401).json({
                success:false,
                message : "Incorrect Password",
            });
        }
        //Login successful
        //Token generation for user
        const token=jwt.sign({id:user_name._id},process.env.JWT_SECRET,{expiresIn:"8h"});
        //Respnes send
        const roleOfUserLoggedIn=await Role.findOne({
           _id:user_name.role
        });
        // console.log("Role",roleOfUserLoggedIn.roleName);
        
        res.status(200).json({
            success: true,
            message: "Login Successful",
            token,
            role:roleOfUserLoggedIn.roleName
        })
    }catch(error){
        res.status(500).json({
        success: false,
        message: error.message
      });
    }
}

exports.register = async (req, res) => {
    try {

        const { name, email, userId, password } = req.body;

        // Check required fields
        if (!name || !email || !userId || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            });
        }

        // Check duplicate email
        const existingEmail = await User.findOne({ email });

        if (existingEmail) {
            return res.status(409).json({
                success: false,
                message: "Email already exists."
            });
        }

        // Check duplicate userId
        const existingUser = await User.findOne({ userId });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User ID already exists."
            });
        }

        // Fetch default User role
        const userRole = await Role.findOne({ roleName: "User" });

        if (!userRole) {
            return res.status(500).json({
                success: false,
                message: "Default User role not found."
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = new User({
            name,
            email,
            userId,
            password: hashedPassword,
            role: userRole._id,
            isActive: true
        });

        await user.save();

        return res.status(201).json({
            success: true,
            message: "User registered successfully."
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};