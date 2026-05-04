// Middleware factory: recibe el permiso requerido y devuelve un middleware Express
module.exports = (permisoRequerido) => {
    return (req, res, next) => {
        const permisos = req.session.permisos || [];
        if (permisos.includes(permisoRequerido)) {
            return next();
        }
        return res.status(403).send(
            `Acceso denegado: necesitas el permiso "${permisoRequerido}".`
        );
    };
};