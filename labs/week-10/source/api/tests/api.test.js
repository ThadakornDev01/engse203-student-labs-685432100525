import { test, before, describe } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import { createApp } from '../src/app.js';
import { create, loadSeed } from '../src/services/requestService.js';
import { findAll as findAllUsers } from '../src/services/userService.js';

let app;
before(async () => { await loadSeed(); app = createApp(); });

/**
 * TODO W10-TEST (🏠 CP33) · เขียน test อย่างน้อย 6 เคส ที่ยิงเข้าฐานข้อมูลจริง
 *   1. GET /api/requests → 200 และได้ array
 *   2. คืน requesterName ไม่ใช่ requester_id
 *   3. GET /:id พบ → 200 · ไม่พบ → 404
 *   4. POST ถูกต้อง → 201
 *   5. POST ไม่ครบ → 400
 *   6. ยิง SQL injection ผ่าน ?status= แล้วต้องไม่หลุด
 */
describe('GET /api/requests', () => {
  test('คืนรายการทั้งหมด พร้อม status 200', async () => {
    const res = await request(app).get('/api/requests');
    assert.equal(res.status, 200);
    assert.ok(Array.isArray(res.body));
  });
  test('พบคำร้อง → status 200', async () => {
    const res = await request(app).get('/api/requests/REQ-001');
    assert.equal(res.status, 200);
    assert.equal(res.body.id, 'REQ-001');
  });
  test('ไม่พบคำร้อง → status 404', async () => {
    const res = await request(app).get('/api/requests/REQ-999');
    assert.equal(res.status, 404);
  });
});


describe('POST /api/requests', () => {
  test('ข้อมูลถูกต้อง → status 201 และ status เป็น pending', async () => {
    const newRequest = {
      "requesterName": "ทดสอบ นักศึกษา",
      "requestType": "แจ้งซ่อม",
      "location": "C3-401",
      "details": "รายละเอียดยาวพอสมควรจริง",
      "priority": "normal"
    }
    const res = await request(app).post('/api/requests').send(newRequest);
    assert.equal(res.status, 201);
    assert.equal(res.body.status, 'pending');
  });
  test('ข้อมูลไม่ครบ → status 400', async () => {
    const incompleteRequest = {
      "requesterName": "ทดสอบ นักศึกษา",
      "requestType": "แจ้งซ่อม"
    };
    const res = await request(app).post('/api/requests').send(incompleteRequest);
    assert.equal(res.status, 400);
  });
});

describe('CORS', () => {
  test('อนุญาต origin ที่กำหนด', async () => {
    const res = await request(app).get('/api/requests').set('Origin', 'http://localhost:5173');
    assert.equal(res.status, 200);
    assert.equal(res.headers['access-control-allow-origin'], 'http://localhost:5173');
  });
});


describe('transaction ของ POST', () => {
  test('ถ้า INSERT คำร้องติด CHECK ต้อง rollback ผู้ใช้ใหม่ด้วย', () => {
    const name = `ผู้ทดสอบ rollback ${Date.now()}`;
    assert.equal(findAllUsers().some((user) => user.name === name), false);

    assert.throws(() => create({
      requesterName: name,
      requestType: 'ชนิดคำร้องที่ไม่มีจริง',
      location: 'ห้องทดสอบ',
      details: 'ทดสอบ rollback เมื่อ request_type ผิด CHECK',
      priority: 'normal',
    }), /CHECK constraint failed/);

    assert.equal(findAllUsers().some((user) => user.name === name), false);
  });
});


describe('GET /api/users', () => {
  test('คืนรายชื่อผู้ใช้ทั้งหมด', async () => {
    const res = await request(app).get('/api/users');
    assert.equal(res.status, 200);
    assert.ok(Array.isArray(res.body));
    assert.ok(res.body.length > 0);
  });

  test('คืนคำร้องของผู้ใช้ที่ระบุ และ 404 เมื่อไม่มีผู้ใช้นั้น', async () => {
    const res = await request(app).get('/api/users/1/requests');
    assert.equal(res.status, 200);
    assert.ok(Array.isArray(res.body));
    assert.ok(res.body.every((item) => item.requesterName === 'สมชาย ใจดี'));

    const missing = await request(app).get('/api/users/99999/requests');
    assert.equal(missing.status, 404);
  });
});
