import { Router } from 'express';
import * as authService from '../services/authService.js';
import { validateLoginInput } from '../validators/requestValidator.js';

// route ให้มาแล้ว — งานหลักอยู่ใน services/authService.js (CP50)
const router = Router();
const LOGIN_WINDOW_MS = 15 * 60 * 1000;
const LOGIN_FAILURE_LIMIT = 5;
const loginFailures = new Map();

function clientKey(req) {
  return req.ip;
}

function getActiveFailures(key, now = Date.now()) {
  const recent = (loginFailures.get(key) ?? []).filter((time) => now - time < LOGIN_WINDOW_MS);
  if (recent.length) loginFailures.set(key, recent);
  else loginFailures.delete(key);
  return recent;
}

export function resetLoginLimiter() {
  loginFailures.clear();
}

router.post('/login', (req, res) => {
  const key = clientKey(req);
  if (getActiveFailures(key).length >= LOGIN_FAILURE_LIMIT) {
    return res.status(429).json({ error: 'พยายามเข้าสู่ระบบมากเกินไป กรุณารอ 15 นาทีแล้วลองใหม่' });
  }

  const errors = validateLoginInput(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ error: 'ข้อมูลเข้าสู่ระบบไม่ถูกต้อง', details: errors });
  }
  const result = authService.login(req.body.email, req.body.password);
  if (!result) {
    const failures = getActiveFailures(key);
    failures.push(Date.now());
    loginFailures.set(key, failures);
    if (failures.length >= LOGIN_FAILURE_LIMIT) {
      return res.status(429).json({ error: 'พยายามเข้าสู่ระบบมากเกินไป กรุณารอ 15 นาทีแล้วลองใหม่' });
    }
    return res.status(401).json({ error: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' });
  }
  loginFailures.delete(key);
  res.status(200).json(result);
});

export default router;
