const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Role = require('../models/roleModel');
const CustomError = require('../utils/CustomError');
const transporter = require('../utils/emailService');

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

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

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
async function assignRole(req, res, next) {
    try {
        const { userId, roleName } = req.body;
        const user = await User.findById(userId);
        if (!user) {
            throw new CustomError("User not found.", 404);
        }
        const role = await Role.findOne({ name: roleName });
        if (!role) {
            throw new CustomError("Role not found.", 404);
        }
        if (user.roles.includes(role._id)) {
            throw new CustomError("Role already assigned to user.", 400);
        }
        user.roles.push(role._id);
        await user.save();
        res.json({ message: `Role ${roleName} assigned to user ${user.username} successfully.`});
    } catch (error) {
        next(error);
    }
}

async function getUserRoles(req, res, next) {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId).populate('roles');
        if (!user) {
            throw new CustomError("User not found.", 404);
        }
        const roles = user.roles.map(role => role.name);
        res.json({ roles });
    } catch (error) {
        next(error);
    }
}

async function removeRoleFromUser(req, res, next) {
    try {
        const { userId, roleName } = req.body;
        const user = await User.findById(userId);
        if (!user) {
            throw new CustomError("User not found.", 404);
        }
        const role = await Role.findOne({ name: roleName });
        if (!role) {
            throw new CustomError("Role not found.", 404);
        }
        user.roles.pull(role._id);
        await user.save();
        res.json({ message: `Role ${roleName} removed from user ${user.username} successfully. `});
    } catch (error) {
        next(error);
    }
}

async function addCoauthor(req, res, next) {
    try {
        const { coauthor_mail } = req.body;

        const user = await User.findOne({ email: coauthor_mail });
        if (!user) {
            throw new CustomError("User not found with the provided email and needs to register on the platform first", 404);
        }

        const coauthorRole = await Role.findOne({ name: "co-author" });
        if (!coauthorRole) {
            throw new CustomError("Co-author role not found.", 404);
        }

        if (user.roles.includes(coauthorRole._id)) {
            throw new CustomError("User is already a co-author.", 400);
        }

        user.roles.push(coauthorRole._id);
        await user.save();

        const mailData = {
            from: 'himanshusharmabthinda@gmail.com',
            to: coauthor_mail,
            subject: 'Co-author Invitation',
            text: 'You have been assigned as a co-author.',
            html: '<b>Congratulations!</b><br>You have been assigned as a co-author.',
        };
    
        transporter.sendMail(mailData, function (err, info) {
            if (err) {
                console.log("Email sending error:", err);
            } else {
                console.log("Email sent successfully:", info);
            }
        });

        res.status(200).json({ message: 'Co-author role assigned and notification sent successfully!' });
    } catch (error) {
        next(error);
    }
}

module.exports = { 
    registerUser, 
    loginUser,
    startEditingSession, 
    joinEditingSession,
    assignRole,
    getUserRoles,
    removeRoleFromUser,
    addCoauthor
};
