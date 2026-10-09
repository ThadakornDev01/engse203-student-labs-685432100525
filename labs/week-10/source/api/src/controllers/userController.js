import * as service from '../services/userService.js';

export function listUsers(req, res) {
  res.status(200).json(service.findAll());
}

export function listUserRequests(req, res) {
  const userId = Number(req.params.id);
  if (!Number.isInteger(userId) || userId < 1 || !service.findById(userId)) {
    return res.status(404).json({ error: `ไม่พบผู้ใช้รหัส ${req.params.id}` });
  }
  res.status(200).json(service.findRequestsByUserId(userId));
}
