# Week 06 — Node.js / Express API Foundation

โครงสร้างงานสัปดาห์นี้จัดตามรูปแบบ student repository:

- `source/` — Express API, seed data, dependencies และ checker
- `evidence/` — รายงานทดสอบ ภาพ Postman และคู่มือประกอบ
- `publish/` — ไฟล์เว็บสำหรับ GitHub Pages (ถ้ามี)
- `lab-metadata.json` — สถานะและข้อมูลส่งงาน

ติดตั้งและตรวจ API จาก root ของ repository:

```bash
npm ci --prefix labs/week-06/source
npm --prefix labs/week-06/source run check
```

Week 06 เป็น API backend จึงไม่ได้สร้างหน้าเว็บโดยตรง; `publish/` ใช้สำหรับ output เว็บเมื่อมีหน้าแสดงผลที่ต้องเผยแพร่
