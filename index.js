import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/index.js";
dotenv.config();
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({
    limit: "15mb",
    extended: true
}));
app.use(cors());
app.use("/", router);

const PORT = process.env.PORT || 5000;
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
    })
    .catch((err) => console.log(err.message));
mongoose.set("useFindAndModify", false);