# Week 05 — React Routing, Data Fetching และ Front-end Mini App

คู่มือโจทย์และ checkpoint ฉบับเต็ม: [ASSIGNMENT_GUIDE.md](source/ASSIGNMENT_GUIDE.md)

โครงสร้างงานสัปดาห์นี้จัดตามรูปแบบ student repository:

- `source/` — React/Vite application และ checker
- `evidence/` — รายงานทดสอบ ภาพประกอบ และการใช้ AI
- `publish/` — ไฟล์ build ที่นำไปใช้กับ GitHub Pages
- `lab-metadata.json` — สถานะและข้อมูลส่งงาน

ติดตั้งและตรวจงานจาก root ของ repository:

```bash
npm ci --prefix labs/week-05/source
npm --prefix labs/week-05/source run check
npm --prefix labs/week-05/source run build
```

นำ build ไปเผยแพร่จาก root:

```bash
npm run import:publish -- week-05 labs/week-05/source/dist --replace
npm run build:pages
npm run verify:lab -- week-05
```
