import express from 'express';
import db from './database.js';
import { requireAuth } from './middleware.js';

const router = express.Router();
const dificultadesValidas = new Set(['easy', 'medium', 'hard', 'expert']);

function validarHsk(valor) {
  return Number.isInteger(valor) && valor >= 1 && valor <= 7;
}

function validarUnidad(valor) {
  return Number.isInteger(valor) && valor >= 1 && valor <= 100;
}

// Todas las rutas de este archivo requieren una sesión iniciada.
router.use(requireAuth);

router.get('/', (req, res) => {
  const usuarioId = req.session.usuarioId;

  let preferencias = db.prepare(`
    SELECT hsk_actual, dificultad
    FROM preferencias
    WHERE usuario_id = ?
  `).get(usuarioId);

  // También permite recuperar cuentas antiguas creadas antes de que existiera
  // la tabla de preferencias.
  if (!preferencias) {
    db.prepare(`
      INSERT INTO preferencias (usuario_id)
      VALUES (?)
    `).run(usuarioId);

    preferencias = {
      hsk_actual: 1,
      dificultad: 'easy'
    };
  }

  const progreso = db.prepare(`
    SELECT hsk, unidad, posicion, completada
    FROM progreso
    WHERE usuario_id = ?
    ORDER BY hsk, unidad
  `).all(usuarioId);

  const favoritos = db.prepare(`
    SELECT hsk, unidad, palabra
    FROM favoritos
    WHERE usuario_id = ?
    ORDER BY hsk, unidad, palabra
  `).all(usuarioId);

  return res.json({
    preferencias: {
      hskActual: preferencias.hsk_actual,
      dificultad: preferencias.dificultad
    },
    progreso: progreso.map((unidad) => ({
      hsk: unidad.hsk,
      unidad: unidad.unidad,
      posicion: unidad.posicion,
      completada: Boolean(unidad.completada)
    })),
    favoritos
  });
});

router.put('/preferencias', (req, res) => {
  const usuarioId = req.session.usuarioId;
  const hskActual = Number(req.body.hskActual);
  const dificultad = String(req.body.dificultad || '');

  if (!validarHsk(hskActual)) {
    return res.status(400).json({ error: 'El nivel HSK no es válido' });
  }

  if (!dificultadesValidas.has(dificultad)) {
    return res.status(400).json({ error: 'La dificultad no es válida' });
  }

  db.prepare(`
    INSERT INTO preferencias (usuario_id, hsk_actual, dificultad)
    VALUES (?, ?, ?)
    ON CONFLICT(usuario_id)
    DO UPDATE SET
      hsk_actual = excluded.hsk_actual,
      dificultad = excluded.dificultad
  `).run(usuarioId, hskActual, dificultad);

  return res.json({
    preferencias: { hskActual, dificultad }
  });
});

router.put('/progreso/:hsk/:unidad', (req, res) => {
  const usuarioId = req.session.usuarioId;
  const hsk = Number(req.params.hsk);
  const unidad = Number(req.params.unidad);
  const posicion = Number(req.body.posicion);
  const completada = req.body.completada;

  if (!validarHsk(hsk) || !validarUnidad(unidad)) {
    return res.status(400).json({ error: 'El nivel o la unidad no son válidos' });
  }

  if (!Number.isInteger(posicion) || posicion < 0) {
    return res.status(400).json({ error: 'La posición no es válida' });
  }

  if (typeof completada !== 'boolean') {
    return res.status(400).json({ error: 'El estado de finalización no es válido' });
  }

  db.prepare(`
    INSERT INTO progreso (usuario_id, hsk, unidad, posicion, completada)
    VALUES (?, ?, ?, ?, ?)
    ON CONFLICT(usuario_id, hsk, unidad)
    DO UPDATE SET
      posicion = excluded.posicion,
      completada = excluded.completada
  `).run(usuarioId, hsk, unidad, posicion, completada ? 1 : 0);

  return res.json({
    progreso: { hsk, unidad, posicion, completada }
  });
});

router.post('/favoritos', (req, res) => {
  const usuarioId = req.session.usuarioId;
  const hsk = Number(req.body.hsk);
  const unidad = Number(req.body.unidad);
  const palabra = String(req.body.palabra || '').trim();

  if (!validarHsk(hsk) || !validarUnidad(unidad)) {
    return res.status(400).json({ error: 'El nivel o la unidad no son válidos' });
  }

  if (!palabra || palabra.length > 50) {
    return res.status(400).json({ error: 'La palabra no es válida' });
  }

  db.prepare(`
    INSERT INTO favoritos (usuario_id, hsk, unidad, palabra)
    VALUES (?, ?, ?, ?)
    ON CONFLICT(usuario_id, hsk, unidad, palabra)
    DO NOTHING
  `).run(usuarioId, hsk, unidad, palabra);

  return res.status(201).json({
    favorito: { hsk, unidad, palabra }
  });
});

router.delete('/favoritos/:hsk/:unidad/:palabra', (req, res) => {
  const usuarioId = req.session.usuarioId;
  const hsk = Number(req.params.hsk);
  const unidad = Number(req.params.unidad);
  const palabra = String(req.params.palabra || '').trim();

  if (!validarHsk(hsk) || !validarUnidad(unidad) || !palabra || palabra.length > 50) {
    return res.status(400).json({ error: 'Los datos del favorito no son válidos' });
  }

  const resultado = db.prepare(`
    DELETE FROM favoritos
    WHERE usuario_id = ?
      AND hsk = ?
      AND unidad = ?
      AND palabra = ?
  `).run(usuarioId, hsk, unidad, palabra);

  return res.json({ eliminado: resultado.changes > 0 });
});

export default router;
