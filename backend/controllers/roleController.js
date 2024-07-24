const Role = require('../models/roleModel');

class RoleController {
    async createRoles() {
        const rolesToCreate = [
            { name: 'author', permissions: ['CREATE', 'READ', 'UPDATE', 'DELETE'] },
            { name: 'reviewer', permissions: ['READ', 'RUN_TESTCASES'] },
            { name: 'editor', permissions: ['READ', 'UPDATE'] },
            { name: 'co-author', permissions: ['READ', 'CONTRIBUTE'] },
            { name: 'admin', permissions: ['CREATE', 'READ', 'UPDATE', 'DELETE', 'RUN_TESTCASES', 'CONTRIBUTE', 'MANAGE_PERMISSIONS'] },
        ];

        for (const roleData of rolesToCreate) {
            const existingRole = await Role.findOne({ name: roleData.name });
            if (!existingRole) {
                const newRole = new Role(roleData);
                await newRole.save();
            }
        }
    }

    async deleteRole(roleName) {
        await Role.findOneAndRemove({ name: roleName });
    }

    async modifyRole(roleName, updatedPermissions) {
        const role = await Role.findOne({ name: roleName });
        if (role) {
            role.permissions = updatedPermissions;
            await role.save();
        }
    }
}

module.exports = RoleController;
