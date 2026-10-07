import Database from 'better-sqlite3';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDirectory = path.join(__dirname, '..', 'data');
fs.mkdirSync(dataDirectory, { recursive: true });

const databasePath = path.join(dataDirectory, 'app.db');
const db = new Database(databasePath);

db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

db.exec(`
  CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    fecha_creacion TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS progreso (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id INTEGER NOT NULL,
    hsk INTEGER NOT NULL,
    unidad INTEGER NOT NULL,
    posicion INTEGER NOT NULL DEFAULT 0,
    completada INTEGER NOT NULL DEFAULT 0,
    UNIQUE (usuario_id, hsk, unidad),
    FOREIGN KEY (usuario_id)
      REFERENCES usuarios(id)
      ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS favoritos (
    usuario_id INTEGER NOT NULL,
    hsk INTEGER NOT NULL,
    unidad INTEGER NOT NULL,
    palabra TEXT NOT NULL,
    PRIMARY KEY (usuario_id, hsk, unidad, palabra),
    FOREIGN KEY (usuario_id)
      REFERENCES usuarios(id)
      ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS preferencias (
    usuario_id INTEGER PRIMARY KEY,
    hsk_actual INTEGER NOT NULL DEFAULT 1,
    dificultad TEXT NOT NULL DEFAULT 'easy',
    FOREIGN KEY (usuario_id)
      REFERENCES usuarios(id)
      ON DELETE CASCADE
  );
`);

export default db;
