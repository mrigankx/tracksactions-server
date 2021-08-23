import bcrypt from "bcryptjs";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import MaxBalance from "../models/MaxBalance.js";
export const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(422).json({ status: "error", body: null, msg: "Unprocessable Entity", error: "Unprocessable Entity" });
        }
        const userExist = await User.findOne({ email });
        if (!userExist) {
            return res.status(400).json({ status: "error", body: null, msg: "Invalid Credentials", error: "Invalid Credentials" });
        }
        const isMatch = await bcrypt.compare(password, userExist.password);
        if (!isMatch) {
            return res.status(400).json({ status: "error", body: null, msg: "Invalid Credentials", error: "Invalid Credentials" });
        }
        const token = jwt.sign({ email: userExist.email, id: userExist._id },
            process.env.SECRET_KEY,
            { expiresIn: "1h" }
        );
        const data = { ...userExist._doc, token };
        return res.status(201).json({ status: "ok", body: data, msg: "Loggedin Successfully", error: null });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: "error", body: null, msg: "Something went wrong!!!", error: "Something went wrong!" });
    }
}
export const signup = async (req, res) => {
    let { firstName, lastName, email, password, cpassword } = req.body;
    try {
        if (password !== cpassword) {
            return res.status(400).json({ status: "error", body: null, msg: "Passwords aren't matching", error: "Different passwords" })
        }
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ status: "error", body: null, msg: "User already registered", error: "User already exists" })
        }
        password = await bcrypt.hash(password, 12);

        const newUser = new User({
            name: `${firstName} ${lastName}`,
            email,
            password,
        });
        await newUser.save();
        const newMaxBalance = new MaxBalance({
            email
        });
        await newMaxBalance.save();
        const token = jwt.sign({ email },
            process.env.SECRET_KEY,
            { expiresIn: "3h" }
        );
        const data = { ...newUser._doc, token };
        return res.status(201).json({ status: "ok", body: data, msg: "User Registered Successfully", error: null });
    }
    catch (err) {
        return res.status(503).json({ status: "error", body: null, msg: "Registration Failed", error: "Registration Failed" })
    }
}
export const signupwithgoogle = async (req, res) => {
    let { name, email } = req.body;
    try {
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(201).json({ status: "ok", body: null, msg: "User already registered", error: "User already exists" })
        }

        const newUser = new User({
            name: name,
            email,
        });
        await newUser.save();
        const newMaxBalance = new MaxBalance({
            email
        });
        await newMaxBalance.save();
        return res.status(201).json({ status: "ok", body: null, msg: "User Registered Successfully", error: null });
    } catch (error) {
        console.log(error);
        return res.status(503).json({ status: "error", body: null, msg: "Registration Failed", error: "Registration Failed" })
    }
}