# Week 06 source — Campus Service API

Express API สำหรับจัดการคำร้องบริการในหน่วยความจำ พร้อม seed data และ checker แบบ Supertest

จาก root ของ repository:

```bash
npm ci --prefix labs/week-06/source
npm --prefix labs/week-06/source run check
npm --prefix labs/week-06/source run dev
```

API ใช้ `GET /`, `GET /api/requests`, `GET /api/requests/:id`, `POST /api/requests`, `PUT /api/requests/:id` และ `DELETE /api/requests/:id`.
