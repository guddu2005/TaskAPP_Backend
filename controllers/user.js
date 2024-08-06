const { v4: uuidv4 } = require("uuid");
const User = require("../models/User"); // Ensure this path is correct

const { setUser } = require("../service/auth");

const handleUserSignUp = async (req, res) => {
    const { email, name, password } = req.body;
    await User.create({
        name,
        email,
        password
    });

    return res.redirect("/task");
}

const handleUserLogin = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });

    if (!user) {
        return res.render("login", {
            error: "Invalid userName or Password!"
        });
    }
    const sessionId = uuidv4();
    setUser(sessionId, user);
    res.cookie("gid", sessionId);
    return res.redirect("/task");
}

module.exports = {
    handleUserLogin,
    handleUserSignUp,
};
