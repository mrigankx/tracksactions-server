//jshint esversion: 6
import mongoose from "mongoose";
const mxbalSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    max_balance: {
        type: Number,
        default: 5000
    }
});

const MaxBalance = mongoose.model('MaxBalance', mxbalSchema);

export default MaxBalance;