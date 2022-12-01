const admin = true;

const validarAdmin = (req, res, next) => {
    if (admin) next();
    else res.status(401).json({ error: -1, descripcion:`Ruta No autorizada` });
};

module.exports = {
    validarAdmin,
};