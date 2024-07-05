const Role = require('../models/roleModel');

class RoleController {
    async createRoles() {
        const authorRole = new Role({
            name: 'author',
            permissions: ['CREATE', 'READ', 'UPDATE', 'DELETE']
        });

        const reviewerRole = new Role({
            name: 'reviewer',
            permissions: ['READ', 'RUN_TESTCASES']
        });

        const editorRole = new Role({
            name: 'editor',
            permissions: ['READ', 'UPDATE']
        });

        const coAuthorRole = new Role({
            name: 'co-author',
            permissions: ['READ','CONTRIBUTE']
        });

        const adminRole = new Role({
            name: 'author',
            permissions: ['CREATE', 'READ', 'UPDATE', 'DELETE', 'RUN_TESTCASES', 'CONTRIBUTE', 'MANAGE_PERMISSIONS']
        });

        await authorRole.save();
        await reviewerRole.save();
        await editorRole.save();
        await coAuthorRole.save();
        await adminRole.save();
    }
}

module.exports = RoleController;