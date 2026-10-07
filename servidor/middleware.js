export function requireAuth(req, res, next) {
  if (!req.session.usuarioId) {
    return res.status(401).json({
      error: 'Debes iniciar sesión'
    });
  }

  next();
}

export function requirePageAuth(req, res, next) {
  if (!req.session.usuarioId) {
    return res.redirect('/acceso.html');
  }

  next();
}
