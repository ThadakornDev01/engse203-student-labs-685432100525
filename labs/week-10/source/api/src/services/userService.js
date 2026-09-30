import { getDatabase } from './requestService.js';

const REQUESTS_FOR_USER = `
  SELECT r.id,
         u.name          AS requesterName,
         r.request_type  AS requestType,
         r.location,
         r.details,
         r.priority,
         r.status
  FROM requests r
  JOIN users u ON u.id = r.requester_id`;

export function findAll() {
  return getDatabase()
    .prepare('SELECT id, name, department, email FROM users ORDER BY id')
    .all();
}

export function findById(id) {
  return getDatabase()
    .prepare('SELECT id, name, department, email FROM users WHERE id = ?')
    .get(id) ?? null;
}

export function findRequestsByUserId(id) {
  return getDatabase()
    .prepare(`${REQUESTS_FOR_USER} WHERE r.requester_id = ? ORDER BY r.id`)
    .all(id);
}
