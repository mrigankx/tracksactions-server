import UserData from "../models/UserData.js";
import User from "../models/User.js";
import MaxBalance from "../models/MaxBalance.js";
export const getexpenses = async (req, res) => {
    try {
        const user = req.body;
        const username = user.email;
        const data = await UserData.find({ username }).sort({ entrydate: -1 });
        return res.status(201).json({ status: "ok", body: data, msg: "data found", error: null });
    } catch (error) {
        return res.status(503).json({ status: "error", body: null, msg: "Server error", error: error });
    }
}
export const createexpenses = async (req, res) => {
    try {
        const { username, spent_category, spent_on, amount, entrydate } = req.body;
        const isExist = await User.findOne({ email: username });
        if (!isExist) {
            return res.status(401).json({ status: "error", body: null, msg: "User not found", error: "User not found" });
        }
        const newdata = new UserData({
            username,
            spent_category,
            spent_on,
            amount,
            entrydate
        });
        await newdata.save();
        return res.status(201).json({ status: "ok", body: null, msg: "Expenses Added Successfully", error: null });
    } catch (error) {
        console.log(error);
        return res.status(503).json({ status: "error", body: null, msg: "Something went wrong!", error: error });

    }
}

export const updatebalance = async (req, res) => {
    try {
        const { username, newBudgetBalance } = req.body;
        const isExist = await User.findOne({ email: username });
        if (!isExist) {
            return res.status(401).json({ status: "error", body: null, msg: "User not found", error: "User not found" });
        }
        const myquery = { email: username };
        const newvalues = { $set: { max_balance: newBudgetBalance } };
        const newbal = await MaxBalance.updateOne(myquery, newvalues);
        return res.status(201).json({ status: "ok", body: null, msg: "Updated Successfully", error: null });

    } catch (error) {
        console.log(error);
        return res.status(503).json({ status: "error", body: null, msg: "Something went wrong!", error: error });
    }
}
export const getmaxbalance = async (req, res) => {
    try {
        const { email } = req.body;
        const isExist = await User.findOne({ email });
        if (!isExist) {
            const newMaxBalance = new MaxBalance({
                email
            });
            await newMaxBalance.save();
        }
        const data = await MaxBalance.findOne({ email });
        return res.status(201).json({ status: "ok", body: data, msg: "Updated Successfully", error: null });

    } catch (error) {
        console.log(error);
        return res.status(503).json({ status: "error", body: null, msg: "Something went wrong!", error: error });
    }
}
export const deleteExpense = async (req, res) => {
    const { selectedRows } = req.body;
    try {
        await UserData.deleteMany({ '_id': { '$in': selectedRows } });
        return res.status(201).json({ status: "ok", body: null, msg: "Deleted Successfully", error: null });
    } catch (error) {
        console.log(error);
        return res.status(503).json({ status: "error", body: null, msg: "Something went wrong!", error: error });
    }
}