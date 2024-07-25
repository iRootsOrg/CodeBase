const User = require('../models/userModel');
const Role = require('../models/roleModel');

class RoleAssignmentController {
    async assignRoleToUser(req, res) {
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
            user.roles.push(role._id);
            await user.save();
            res.json({ message: `Role ${roleName} assigned to user ${user.username} successfully.` });
        } catch (error) {
            next(error);
        }
    }

    async removeRoleFromUser(req, res) {
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
            res.json({ message: `Role ${roleName} removed from user ${user.username} successfully.` });
        } catch (error) {
            next(error);
        }
    }

    async getUserRoles(req, res) {
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
}

module.exports = RoleAssignmentController;