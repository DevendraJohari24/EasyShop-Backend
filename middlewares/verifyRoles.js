const ErrorHandler = require("../utils/errorHandler");

const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req?.roles) {
            return next(new ErrorHandler("Does not have enough permissions", 401))
        }
        const rolesArray = [...allowedRoles];
        const result = req.roles.map(role => rolesArray.includes(role)).find(val => val === true);
        if (!result) {
            return next(new ErrorHandler("Does not have enough permissions", 401))
        }
        next();
    }
}

module.exports = verifyRoles;