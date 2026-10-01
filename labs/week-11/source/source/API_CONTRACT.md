# API Contract — Campus Service Request API

**เวอร์ชัน:** 2.2.0 · **Base URL:** `http://localhost:3001`
**รูปแบบข้อมูล:** JSON (`Content-Type: application/json`)

> **API Contract คืออะไร** — ข้อตกลงระหว่างคนทำ front-end กับคนทำ back-end
> ว่าจะคุยกันด้วย endpoint อะไร ส่งอะไรไป ได้อะไรกลับ
> มีไว้เพื่อให้สองฝั่ง**ทำงานคู่ขนานกันได้** โดยไม่ต้องรอกัน

---

## Data Model / ฐานข้อมูล

ฐานข้อมูลประกอบด้วย `users` และ `requests` ซึ่งมีความสัมพันธ์แบบหนึ่งต่อหลาย: ผู้ใช้หนึ่งคนแจ้งคำร้องได้หลายรายการ และแต่ละคำร้องอ้างถึงผู้ใช้หนึ่งคนผ่าน `requests.requester_id` → `users.id`.

| ตาราง | คอลัมน์ | ชนิดและข้อกำหนด |
|---|---|---|
| `users` | `id` | INTEGER, Primary Key, AUTOINCREMENT |
| `users` | `name`, `department` | TEXT, NOT NULL |
| `users` | `email` | TEXT, NOT NULL, UNIQUE |
| `requests` | `id` | TEXT, Primary Key |
| `requests` | `requester_id` | INTEGER, NOT NULL, Foreign Key → `users.id` |
| `requests` | `request_type`, `location`, `details` | TEXT, NOT NULL |
| `requests` | `priority` | TEXT, NOT NULL, DEFAULT `normal`, CHECK: `low`, `normal`, `urgent` |
| `requests` | `status` | TEXT, NOT NULL, DEFAULT `pending`, CHECK: `pending`, `in-progress`, `completed` |
| `requests` | `created_at` | TEXT, NOT NULL, DEFAULT เวลาปัจจุบัน |

### รูปแบบฐานข้อมูลกับข้อมูลที่ API ส่งออก

ฐานข้อมูลเก็บ `requester_id` ซึ่งเป็นเลขอ้างอิงผู้ใช้ เพื่อลดการเก็บชื่อซ้ำในคำร้อง ส่วน API ส่ง `requesterName` ซึ่งเป็นชื่อที่ frontend ต้องการ Service ใช้ `JOIN` ระหว่าง `requests` กับ `users` และตั้งชื่อคอลัมน์ด้วย `AS requesterName` เพื่อแปลงจากรูปแบบในฐานข้อมูลเป็นรูปแบบของ API.

### พฤติกรรมของ POST ที่ควรรู้

เมื่อ POST คำร้อง Service จะค้นหา `requesterName` ใน `users` ก่อน ถ้าพบจะใช้ `users.id` เดิม แต่ถ้าไม่พบจะสร้างผู้ใช้ใหม่โดยอัตโนมัติ (`department` เป็น `ไม่ระบุ` และสร้างอีเมลตามรหัสเวลา) แล้วจึงสร้างคำร้องที่อ้างถึงผู้ใช้นั้น ดังนั้นการส่งชื่อใหม่หรือชื่อที่สะกดต่างจากเดิมอาจเพิ่ม user record ใหม่ในฐานข้อมูลได้ ผู้เรียก API ควรทราบผลข้างเคียงนี้ก่อนส่งข้อมูล.

## ประวัติการเปลี่ยนแปลง

| เวอร์ชัน | การเปลี่ยนแปลง |
|---|---|
| 2.0.0 | เอกสาร API Contract สำหรับ endpoints และรูปแบบข้อมูล |
| 2.1.0 | เพิ่ม Data Model, อธิบายการแปลงรูปแบบฐานข้อมูล/API และบันทึกพฤติกรรม POST ที่สร้างผู้ใช้ใหม่อัตโนมัติ |
| 2.2.0 | เพิ่ม endpoints สำหรับดูผู้ใช้และคำร้องของผู้ใช้ |

---

## โครงสร้างข้อมูล Request

| field | ชนิด | คำอธิบาย | ตัวอย่าง |
|---|---|---|---|
| `id` | string | รหัสคำร้อง · ขึ้นต้นด้วย `REQ-` · เซิร์ฟเวอร์สร้างให้ | `"REQ-001"` |
| `requesterName` | string | ชื่อผู้แจ้ง · อย่างน้อย 2 ตัวอักษร | `"สมชาย ใจดี"` |
| `requestType` | string | ประเภท · 1 ใน 4 ค่าที่กำหนด | `"แจ้งซ่อม"` |
| `location` | string | สถานที่ · ห้ามว่าง | `"ห้องปฏิบัติการ 301"` |
| `details` | string | รายละเอียด · อย่างน้อย 10 ตัวอักษร | `"เครื่องปรับอากาศไม่ทำงาน"` |
| `priority` | string | `"normal"` หรือ `"urgent"` | `"urgent"` |
| `status` | string | `"pending"` · `"in-progress"` · `"completed"` | `"pending"` |

**ค่าที่ยอมรับของ `requestType`** — `แจ้งซ่อม` · `บริการบัญชีผู้ใช้` · `ขอใช้อุปกรณ์` · `อื่น ๆ`

---

## Endpoints

| Method | Endpoint | คำอธิบาย | Request body | สำเร็จ | ผิดพลาด |
|---|---|---|---|---|---|
| `GET` | `/api/requests` | ดูคำร้องทั้งหมด | — | `200` + array | — |
| `GET` | `/api/users` | ดูผู้ใช้ทั้งหมด | — | `200` + array | — |
| `GET` | `/api/users/:id/requests` | ดูคำร้องของผู้ใช้ | — | `200` + array | `404` ไม่พบผู้ใช้ |
| `GET` | `/api/requests?status=` | กรองตามสถานะ | — | `200` + array | — |
| `GET` | `/api/requests/:id` | ดูคำร้องใบเดียว | — | `200` + object | `404` ไม่พบ |
| `POST` | `/api/requests` | สร้างคำร้องใหม่ | Request (ไม่ต้องมี `id`, `status`) | `201` + object ที่สร้าง | `400` ข้อมูลไม่ถูกต้อง |
| `PUT` | `/api/requests/:id` | เปลี่ยนสถานะ | `{ "status": "..." }` | `200` + object ที่แก้แล้ว | `400` สถานะผิด · `404` ไม่พบ |
| `DELETE` | `/api/requests/:id` | ลบคำร้อง | — | `204` ไม่มี body | `404` ไม่พบ |

---

## ตัวอย่างการเรียกใช้

### GET /api/requests

```http
GET /api/requests HTTP/1.1
Host: localhost:3001
```

```json
[
  {
    "id": "REQ-001",
    "requesterName": "สมชาย ใจดี",
    "requestType": "แจ้งซ่อม",
    "location": "ห้องปฏิบัติการ 301",
    "details": "เครื่องปรับอากาศไม่ทำงานตั้งแต่เช้า",
    "priority": "urgent",
    "status": "pending"
  }
]
```

### POST /api/requests

```http
POST /api/requests HTTP/1.1
Content-Type: application/json

{
  "requesterName": "สุภาวดี รักเรียน",
  "requestType": "ขอใช้อุปกรณ์",
  "location": "ห้องประชุม 2",
  "details": "ขอยืมโปรเจกเตอร์สำหรับนำเสนอ",
  "priority": "normal"
}
```

**201 Created**

```json
{
  "id": "REQ-MTYOA3MX-YEX9",
  "requesterName": "สุภาวดี รักเรียน",
  "requestType": "ขอใช้อุปกรณ์",
  "location": "ห้องประชุม 2",
  "details": "ขอยืมโปรเจกเตอร์สำหรับนำเสนอ",
  "priority": "normal",
  "status": "pending"
}
```

**400 Bad Request** — เมื่อข้อมูลไม่ถูกต้อง

```json
{
  "error": "ข้อมูลคำร้องไม่ถูกต้อง",
  "details": [
    "ชื่อผู้แจ้งต้องมีอย่างน้อย 2 ตัวอักษร",
    "รายละเอียดต้องมีอย่างน้อย 10 ตัวอักษร"
  ]
}
```

### PUT /api/requests/:id

```http
PUT /api/requests/REQ-001 HTTP/1.1
Content-Type: application/json

{ "status": "in-progress" }
```

**200 OK** — คืนคำร้องที่อัปเดตแล้ว

### DELETE /api/requests/:id

**204 No Content** — ไม่มี body ส่งกลับ

---

## รูปแบบ Error

ทุก error ตอบเป็น JSON ที่มี field `error` เสมอ

```json
{ "error": "ข้อความที่ผู้ใช้ทั่วไปอ่านเข้าใจ" }
```

กรณี validation จะมี `details` เพิ่มมาเป็น array บอกว่าผิดตรงไหนบ้าง

| Status | เมื่อไหร่ | ฝั่งไหนผิด |
|---|---|---|
| `400` | ข้อมูลที่ส่งมาไม่ถูกต้อง | ผู้ใช้ |
| `404` | ไม่พบทรัพยากรที่ขอ | ผู้ใช้ |
| `500` | โค้ดเซิร์ฟเวอร์ผิดพลาด | เซิร์ฟเวอร์ |

> **ตอน production จะไม่ส่ง stack trace กลับไป** — เปิดเผยโครงสร้างภายในให้คนภายนอกเห็นไม่ได้

---

## CORS

API อนุญาตให้เรียกจาก origin ที่กำหนดใน `CORS_ORIGIN` เท่านั้น

```
Access-Control-Allow-Origin: http://localhost:5173
```

**ถ้าเรียกจาก origin อื่น** เบราว์เซอร์จะบล็อกก่อนที่โค้ดจะได้เห็น response — จะเห็น error ใน Console ว่าถูกบล็อกโดย CORS policy

> ⚠ CORS เป็นกลไกของ **เบราว์เซอร์** เท่านั้น · Postman และ curl ไม่ถูกบล็อก เพราะไม่ใช่เบราว์เซอร์

---

## Environment Variables

### ฝั่ง API (`api/.env`)

| ตัวแปร | ค่าเริ่มต้น | คำอธิบาย |
|---|---|---|
| `PORT` | `3001` | พอร์ตที่ API รับคำขอ |
| `CORS_ORIGIN` | `http://localhost:5173` | origin ที่อนุญาตให้เรียก |
| `NODE_ENV` | `development` | `production` จะเปลี่ยนรูปแบบ log และซ่อน stack trace |

### ฝั่ง Frontend (`frontend/.env.local`)

| ตัวแปร | ค่าเริ่มต้น | คำอธิบาย |
|---|---|---|
| `VITE_API_BASE_URL` | `http://localhost:3001` | ที่อยู่ของ API |

> **ต้องขึ้นต้นด้วย `VITE_`** ไม่งั้น Vite จะไม่ส่งค่าไปให้โค้ดฝั่งเบราว์เซอร์
> และ**ห้าม commit ไฟล์ `.env`** — ใช้ `.env.example` เป็นตัวอย่างแทน

---

## การรันทั้งระบบ

ต้องเปิด **2 terminal** พร้อมกัน

```bash
# Terminal 1 — API
cd api && npm run dev          # http://localhost:3001

# Terminal 2 — Frontend
cd frontend && npm run dev     # http://localhost:5173
```

**ลำดับสำคัญ** — เปิด API ก่อนเสมอ ไม่งั้น frontend จะขึ้นข้อความว่าติดต่อเซิร์ฟเวอร์ไม่ได้
