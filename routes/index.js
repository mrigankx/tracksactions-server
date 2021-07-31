import express from "express";
import { signin, signup, signupwithgoogle } from "../controllers/auth.js";
import { getexpenses, createexpenses, updatebalance, getmaxbalance, deleteExpense } from "../controllers/expense.js";
import ensureLoggedin from "../middleware/index.js";
const router = express.Router();

router.get('/', (req, res) => {
    res.send("success");
})
router.post("/signin", signin);
router.post("/signup", signup);
router.post("/signupwithgoogle", signupwithgoogle);
router.post("/dashboard", ensureLoggedin, (req, res) => {
    return res.status(201).json({ status: "ok", body: null, msg: "User Verified", error: null });
})
router.post("/expenses/getexpense", getexpenses);
router.post("/expenses/createexpense", createexpenses);
router.post("/expenses/updatebalance", updatebalance);
router.post("/expenses/getmaxbalance", getmaxbalance);
router.post("/expenses/deleteexpense", deleteExpense);


export default router;