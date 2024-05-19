const { User, setupInitialUser } = require('../model/auth.model.js');

const checkUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username, password });
        if (user) {
            res.status(200).json({ message: "Login success", validuser: true, userId: 'user123' });
        } else {
            res.status(200).json({ message: "Login failed", validuser: false });
        }
    } catch (error) {
        console.error('Error checking user:', error);
        res.status(500).json({ message: "Login failed", error: error.message, validuser: false });
    }
};

const createUser = async (req, res) => {
    try {
        await setupInitialUser(); // Wait for initial user setup to complete
        res.status(200).json({ message: "created success", validuser: true, userId: 'user123' });
    } catch (error) {
        res.status(500).json({ message: "Failed to create user", error: error.message, validuser: false });
    }
}

module.exports = {
    checkUser,
    createUser
};
