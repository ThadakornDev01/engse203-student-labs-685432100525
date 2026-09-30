import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { DatabaseSync } from 'node:sqlite';

let db;
const HERE = path.dirname(fileURLToPath(import.meta.url));
const API_ROOT = path.resolve(HERE, '../..');
const DB_FILE = process.env.DB_FILE ?? path.join(API_ROOT, 'data', 'campus.db');
const SCHEMA_FILE = path.join(API_ROOT, 'data', 'schema.sql');

export async function loadSeed() {
  db = new DatabaseSync(DB_FILE);
  db.exec('PRAGMA foreign_keys = ON');

  const ready = db.prepare(
    "SELECT COUNT(*) AS c FROM sqlite_master WHERE type='table' AND name='requests'"
  ).get().c;
  if (!ready) db.exec(readFileSync(SCHEMA_FILE, 'utf8'));

  db.exec(`
    CREATE INDEX IF NOT EXISTS idx_requests_status ON requests(status);
    CREATE INDEX IF NOT EXISTS idx_requests_requester ON requests(requester_id);
  `);
}

// Shared connection accessor for the separate user service.
export function getDatabase() {
  if (!db) throw new Error('Database is not initialized; call loadSeed() first');
  return db;
}

const SELECT_SHAPE = `
  SELECT r.id,
         u.name          AS requesterName,
         r.request_type  AS requestType,
         r.location,
         r.details,
         r.priority,
         r.status
  FROM requests r
  JOIN users u ON u.id = r.requester_id`;

export function findAll({ status } = {}) {
  return status
    ? db.prepare(`${SELECT_SHAPE} WHERE r.status = ? ORDER BY r.id`).all(status)
    : db.prepare(`${SELECT_SHAPE} ORDER BY r.id`).all();
}

export function findById(id) {
  return db.prepare(`${SELECT_SHAPE} WHERE r.id = ?`).get(id) ?? null;
}

function resolveUserId(name) {
  const found = db.prepare('SELECT id FROM users WHERE name = ?').get(name);
  if (found) return found.id;

  const slug = Date.now().toString(36);
  return db.prepare('INSERT INTO users (name, department, email) VALUES (?,?,?)')
    .run(name, 'ไม่ระบุ', `user-${slug}@rmutl.ac.th`).lastInsertRowid;
}

function nextId() {
  const row = db.prepare(
    "SELECT id FROM requests WHERE id LIKE 'REQ-%' ORDER BY id DESC LIMIT 1"
  ).get();
  const n = row ? Number(String(row.id).replace('REQ-', '')) + 1 : 1;
  return `REQ-${String(n).padStart(3, '0')}`;
}

export function create(input) {
  db.exec('BEGIN IMMEDIATE');
  let id;
  try {
    id = nextId();
    const requesterId = resolveUserId(input.requesterName.trim());
    db.prepare(
      `INSERT INTO requests (id, requester_id, request_type, location, details, priority)
       VALUES (?, ?, ?, ?, ?, ?)`
    ).run(
      id,
      requesterId,
      input.requestType,
      input.location.trim(),
      input.details.trim(),
      input.priority ?? 'normal'
    );
    db.exec('COMMIT');
  } catch (err) {
    try { db.exec('ROLLBACK'); } catch { /* transaction may already be closed */ }
    throw err;
  }
  return findById(id);
}

export function updateStatus(id, status) {
  const result = db.prepare('UPDATE requests SET status = ? WHERE id = ?')
    .run(status, id);
  return result.changes ? findById(id) : null;
}

export function remove(id) {
  const target = findById(id);
  if (!target) return null;
  db.prepare('DELETE FROM requests WHERE id = ?').run(id);
  return target;
}
