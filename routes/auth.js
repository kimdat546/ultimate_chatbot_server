const express = require("express");
const route = express.Router();
const argon2 = require("argon2");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/auth");

//@route GET api/auth
//@check user is logged in
route.get("/", verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");
        if (!user)
            return res
                .status(400)
                .json({ success: false, message: "Users not found" });
        res.json({ success: true, user });
    } catch (error) {
        console.error(error.message);
        return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
    }
});

// @route POST register
route.post("/register", async (req, res) => {
    const { username, password } = req.body;
    if (!username || !username)
        return res
            .status(400)
            .json({ success: false, message: "Username or Password is empty" });
    try {
        const user = await User.findOne({ username });
        if (user)
            return res
                .status(400)
                .json({ success: false, message: "Username already exists" });
        else {
            const hashpassword = await argon2.hash(password);
            const newUser = new User({ username, password: hashpassword });
            await newUser.save();
            const accessToken = jwt.sign(
                { userId: newUser._id },
                process.env.ACCESS_TOKEN_SECRET
            );
            res.json({ success: true, message: "User created", accessToken });
        }
    } catch (error) {
        console.log("error register" + error);
        return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
    }
});

//@route POST login
route.post("/login", async (req, res) => {
    const { username, password } = req.body;
    if (!username || !username)
        return res
            .status(400)
            .json({ success: false, message: "Username or Password is empty" });
    try {
        const user = await User.findOne({ username });
        if (!user)
            return res
                .status(400)
                .json({ success: false, message: "Username is incorrect" });
        else {
            const passwordValid = await argon2.verify(user.password, password);
            if (!passwordValid)
                res.status(400).json({
                    success: false,
                    message: "Password is incorrect",
                });
            else {
                const accessToken = jwt.sign(
                    { userId: user._id },
                    process.env.ACCESS_TOKEN_SECRET
                );
                res.json({
                    success: true,
                    message: "Login successfully",
                    accessToken,
                });
            }
        }
    } catch (error) {
        console.log("error register" + error);
        return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
    }
});

module.exports = route;
