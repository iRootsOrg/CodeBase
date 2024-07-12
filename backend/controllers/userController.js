const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const CustomError = require("../utils/CustomError.js");

async function registerUser(req, res, next) {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            throw new CustomError("Please provide all required fields.", 400);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        return res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        next(error);
    }
}

async function loginUser(req, res, next) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw new CustomError("Please provide email and password.", 400);
        }

        const user = await User.findOne({ email });

        if (!user) {
            throw new CustomError("User not found.", 404);
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new CustomError("Invalid credentials.", 401);
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).json({ token });
    } catch (error) {
        next(error);
    }
}

async function startEditingSession(req, res) {
    const { code } = req.body;
    const user = req.user;
    const editingSession = new mongoose.model('EditingSession')({ code, users: [user._id], sessionId: new mongoose.Types.ObjectId().toString() });
    await editingSession.save();
    user.editingSessionId = editingSession.sessionId;
    await user.save();
    res.json({ sessionId: editingSession.sessionId });
}

async function joinEditingSession(req, res) {
    const { sessionId } = req.body;
    const user = req.user;
    const editingSession = await mongoose.model('EditingSession').findOne({ sessionId });
    if (!editingSession) {
        return res.status(404).json({ message: 'Editing session not found.' });
    }
    editingSession.users.push(user._id);
    await editingSession.save();
    user.editingSessionId = editingSession.sessionId;
    await user.save();
    res.json({ message: 'Joined editing session successfully.' });
}

module.exports = { registerUser, loginUser, startEditingSession, joinEditingSession };
