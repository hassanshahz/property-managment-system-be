const rbac = (action, resource) => {
    return (req, res, next) => {
        const userRole = req.user.role;

        const roles = {
            admin: {
                property: ['read','write','delete','update'],
                agencies: ['read','write','delete'],
                agent: ['read','write','delete'],
            },
            agency: {
                property: ['read', 'write', 'delete','update'],
                agent: ['read', 'write', 'delete','update'],
                meeting: ['read'],
            },
            agent: {
                property: ['read', 'write', 'delete','update'],
                meeting: ['read','write','delete','update'],
            },
        };

        if (!roles[userRole] || !roles[userRole][resource] || !roles[userRole][resource].includes(action)) {
            return res.status(403).json({ message: 'Access denied' });
        };

        next();
    };
};

module.exports = rbac;
