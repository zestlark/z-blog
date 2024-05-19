const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true 
    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', UserSchema);

const initialUser = {
    username: '',
    password: ''
};

const setupInitialUser = async () => {
    try {
        const existingUser = await User.findOne({ username: initialUser.username });
        if (!existingUser) {
            await User.create(initialUser);
            console.log('Initial user created successfully');
        } else {
            console.log('Initial user already exists');
        }
    } catch (error) {
        console.error('Error setting up initial user:', error);
    }
};

module.exports = { User, setupInitialUser };
