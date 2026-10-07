import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import './database.js';
import authRouter from './auth.js';
import datosRouter from './datos.js';
import { requirePageAuth } from './middleware.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const projectDirectory = path.join(__dirname, '..');
const port = Number(process.env.PORT) || 3000;

if (!process.env.SESSION_SECRET) {
  throw new Error('Falta SESSION_SECRET en el archivo .env');
}

app.use(express.json());

app.use(session({
  name: 'hanzi.sid',
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000
  }
}));

app.use('/api/auth', authRouter);
app.use('/api/datos', datosRouter);

// Se exponen solo los recursos públicos. La configuración y la base de datos
// permanecen fuera del alcance del navegador.
app.use('/css', express.static(path.join(projectDirectory, 'css')));
app.use('/js', express.static(path.join(projectDirectory, 'js')));
app.use('/img', express.static(path.join(projectDirectory, 'img')));
app.use('/audios', express.static(path.join(projectDirectory, 'audios')));
app.get('/acceso.html', (req, res) => {
  if (req.session.usuarioId) return res.redirect('/');
  return res.sendFile(path.join(projectDirectory, 'acceso.html'));
});
app.get('/login.html', (req, res) => {
  if (req.session.usuarioId) return res.redirect('/');
  return res.sendFile(path.join(projectDirectory, 'login.html'));
});
app.get('/registro.html', (req, res) => {
  if (req.session.usuarioId) return res.redirect('/');
  return res.sendFile(path.join(projectDirectory, 'registro.html'));
});
app.use('/paginas', requirePageAuth, express.static(path.join(projectDirectory, 'paginas')));

app.get('/', requirePageAuth, (req, res) => {
  res.sendFile(path.join(projectDirectory, 'index.html'));
});
app.get('/index.html', requirePageAuth, (req, res) => {
  res.sendFile(path.join(projectDirectory, 'index.html'));
});

app.get('/api/estado', (req, res) => {
  res.json({ servidor: 'funcionando' });
});

app.use((error, req, res, next) => {
  console.error(error);
  if (res.headersSent) return next(error);
  return res.status(500).json({ error: 'Ha ocurrido un error en el servidor' });
});

app.listen(port, () => {
  console.log(`Servidor disponible en http://localhost:${port}`);
});
