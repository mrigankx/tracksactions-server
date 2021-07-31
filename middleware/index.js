const ensureLoggedin = async (req, res, next) => {
    try {
        const user = req.body;
        const token = user.token;
        if (!token) {
            throw new Error("User not found");
        }
        next();


    } catch (err) {
        return res.status(401).json({ status: "error", body: null, msg: "Unauthorized access", error: "Unauthorized User" }).send("Unauthorized");
        // console.log(err);
    }
};
export default ensureLoggedin;