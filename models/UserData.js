//jshint esversion: 6
import mongoose from "mongoose";
const userDataSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    entrydate: {
        type: Date,
        default: Date.now,
        required: true,
    },
    spent_category: {
        type: String,
        required: true,
    },
    spent_on: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        default: 0,
        required: true,
    }

});
const UserData = mongoose.model('Userdata', userDataSchema);
export default UserData;