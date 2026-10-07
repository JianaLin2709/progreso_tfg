import express from 'express';
import argon2 from 'argon2';
import rateLimit from 'express-rate-limit';
import db from './database.js';

const router = express.Router();
const aliasPattern = /^[a-z0-9._-]+@learncn\.na$/i;

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: { error: 'Demasiados intentos. Inténtalo de nuevo dentro de unos minutos.' }
});

function publicUser(usuario) {
  return {
    id: usuario.id,
    nombre: usuario.nombre,
    email: usuario.email
  };
}

function createSession(req, usuarioId) {
  return new Promise((resolve, reject) => {
    req.session.regenerate((regenerateError) => {
      if (regenerateError) return reject(regenerateError);

      req.session.usuarioId = usuarioId;
      req.session.save((saveError) => {
        if (saveError) return reject(saveError);
        resolve();
      });
    });
  });
}

router.post('/registro', authLimiter, async (req, res) => {
  const nombre = String(req.body.nombre || '').trim();
  const email = String(req.body.email || '').trim().toLowerCase();
  const password = String(req.body.password || '');

  if (nombre.length < 2 || nombre.length > 50) {
    return res.status(400).json({ error: 'El nombre debe tener entre 2 y 50 caracteres' });
  }

  if (!aliasPattern.test(email) || email.length > 64) {
    return res.status(400).json({ error: 'El alias debe tener el formato nombre@learncn.na' });
  }

  if (password.length < 8 || password.length > 128) {
    return res.status(400).json({ error: 'La contraseña debe tener entre 8 y 128 caracteres' });
  }

  const usuarioExistente = db.prepare('SELECT id FROM usuarios WHERE email = ?').get(email);
  if (usuarioExistente) {
    return res.status(409).json({ error: 'Ya existe una cuenta con ese alias' });
  }

  const passwordHash = await argon2.hash(password);

  const createUser = db.transaction(() => {
    const result = db.prepare(`
      INSERT INTO usuarios (nombre, email, password_hash)
      VALUES (?, ?, ?)
    `).run(nombre, email, passwordHash);

    const usuarioId = Number(result.lastInsertRowid);
    db.prepare('INSERT INTO preferencias (usuario_id) VALUES (?)').run(usuarioId);
    return usuarioId;
  });

  try {
    const usuarioId = createUser();
    await createSession(req, usuarioId);
    return res.status(201).json({ usuario: { id: usuarioId, nombre, email } });
  } catch (error) {
    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return res.status(409).json({ error: 'Ya existe una cuenta con ese alias' });
    }
    throw error;
  }
});

router.post('/login', authLimiter, async (req, res) => {
  const email = String(req.body.email || '').trim().toLowerCase();
  const password = String(req.body.password || '');

  if (!email || !password) {
    return res.status(400).json({ error: 'Introduce el alias y la contraseña' });
  }

  if (!aliasPattern.test(email) || email.length > 64) {
    return res.status(400).json({ error: 'El alias debe tener el formato nombre@learncn.na' });
  }

  const usuario = db.prepare(`
    SELECT id, nombre, email, password_hash
    FROM usuarios
    WHERE email = ?
  `).get(email);

  if (!usuario || !await argon2.verify(usuario.password_hash, password)) {
    return res.status(401).json({ error: 'Credenciales incorrectas' });
  }

  await createSession(req, usuario.id);
  return res.json({ usuario: publicUser(usuario) });
});

router.get('/sesion', (req, res) => {
  if (!req.session.usuarioId) {
    return res.status(401).json({ error: 'No hay una sesión activa' });
  }

  const usuario = db.prepare(`
    SELECT id, nombre, email
    FROM usuarios
    WHERE id = ?
  `).get(req.session.usuarioId);

  if (!usuario) {
    return req.session.destroy(() => {
      res.clearCookie('learnchinese.sid');
      res.status(401).json({ error: 'No hay una sesión activa' });
    });
  }

  return res.json({ usuario });
});

router.post('/logout', (req, res, next) => {
  req.session.destroy((error) => {
    if (error) return next(error);

    res.clearCookie('learnchinese.sid', {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production'
    });
    return res.status(204).end();
  });
});

export default router;
