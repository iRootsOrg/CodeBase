const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

async function registerUser(req, res) {
    try {
        const { username, email, password, role } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Please provide all required fields.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role
        });

        await newUser.save();

        return res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

async function loginUser(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide email and password.' });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).json({ token });
    } catch (error) {
        console.error('Error logging in user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

async function startEditingSession(req, res) {
    const { code } = req.body;
    const user = req.user;
    const editingSession = new mongoose.model('EditingSession')({ code, users: [user._id] });
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
