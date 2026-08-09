# ENGSE203 LAB 4 — Student Evidence README

## ผู้จัดทำ

- ชื่อ–นามสกุล: ธดากรณ์ เชื้อโต่ง
- รหัสนักศึกษา: 68543210052-5
- Section: 2 

## URLs

- Repository: https://github.com/ThadakornDev01/engse203-student-labs-685432100525/blob/main/labs/week-04/source/src/main.jsx
- Pull Request: https://github.com/ThadakornDev01/engse203-student-labs-685432100525/pull/1
- GitHub Pages: https://thadakorndev01.github.io/engse203-student-labs-685432100525/

## Component Tree

```text
App
├─ AppHeader
├─ SummaryPanel
├─ RequestForm
├─ FilterBar
└─ RequestList
   └─ RequestCard
```

## Setup และ Run

```bash
nvm use
npm install
npm run dev
npm run check
npm run build
npm run preview
```

## State / Props / Callback Explanation

App เป็น state owner ของ tasks และ statusFilter เพราะข้อมูลคำร้องและตัวกรองอยู่ใน component นี้ และถูกส่งต่อไปยัง child component ผ่าน props เช่น RequestForm รับ onAddTask, FilterBar รับ value กับ onFilterChange, RequestList รับ tasks และ onDeleteRequest เพื่อแสดงรายการและลบคำร้อง

## Test Evidence

| Test ID | Actual Result | Pass/Fail | Evidence/Screenshot |
|---|---|---|---|
| TC-01 Initial | รายการคำร้องเริ่มต้นแสดงจาก state | Pass | [evidence/desktop.png](../week-04/evidence/desktop.png) |
| TC-02 Controlled input | ฟอร์มใช้ controlled input โดย state ควบคุมค่า | Pass | [evidence/validation.png](../week-04/evidence/validation.png) |
| TC-03 Invalid | แสดงข้อความแยก error เมื่อข้อมูลไม่ครบ/สั้นเกิน | Pass | [evidence/validation.png](../week-04/evidence/validation.png) |
| TC-04 Valid add | เพิ่มคำร้องใหม่และแสดงในรายการด้านบน | Pass | [evidence/desktop.png](../week-04/evidence/desktop.png) |
| TC-05 Filter | กด filter แล้วรายการเปลี่ยนตามสถานะ | Pass | [evidence/empty-state.png](../week-04/evidence/empty-state.png) 
| TC-06 All | กรณีเลือก All แสดงทุกคำร้อง | Pass | [evidence/desktop.png](../week-04/evidence/desktop.png) |
| TC-07 Empty | แสดง empty state เมื่อไม่มีคำร้องที่ตรงเงื่อนไข | Pass | [evidence/empty-state.png](../week-04/evidence/empty-state.png) |
| TC-08 Delete | กดลบจะเอาคำร้องออกจากรายการ | Pass | [evidence/desktop.png](../week-04/evidence/desktop.png) |
| TC-09 Mobile | UI ยังคงใช้งานได้ในพื้นที่แคบ | Pass | [evidence/mobile1.png](../week-04/evidence/mobile1.png) |
| TC-10 Keyboard | ปุ่มและฟิลด์สามารถใช้งานผ่าน keyboard ได้ | Pass | [evidence/keyboard.png](../week-04/evidence/keyboard.png) |
| TC-11 Build | Vite build สำเร็จ | Pass | [evidence/build.png](../week-04/evidence/build.png) |
| TC-12 Pages | หน้าแอปแสดงผ่าน Vite preview | Pass | [evidence/pages.png](../week-04/evidence/pages.png) |

## Screenshots

- Desktop: `evidence/desktop.png`
- Mobile 375px: `evidence/mobile-375.png`
- Validation/empty state: แสดงในหน้า UI ของแอป

## Week 03 → Week 04 Reflection

ใน Week 03 UI ถูกอัปเดตโดยการแก้ DOM โดยตรง ทำให้โค้ดยากต่อการรักษาและทดสอบมากขึ้น ส่วน Week 04 เปลี่ยนเป็น React state-driven UI ที่แยก component และใช้ props กับ callback ทำให้การเพิ่มคำร้อง กรองสถานะ และลบคำร้องเป็นไปได้อย่างมีโครงสร้างและเป็นระบบมากขึ้น

## AI / External Resource Disclosure

ไม่ได้ใช้เครื่องมือ AI ภายนอกในงานนี้

