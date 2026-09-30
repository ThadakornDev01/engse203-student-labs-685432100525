## ผลการทดสอบ Constraint

### ① Foreign Key

**คำสั่งที่ลอง**

```sql
PRAGMA foreign_keys = ON;

INSERT INTO requests (id, requester_id, request_type, location, details)
VALUES ('REQ-TEST', 99999, 'แจ้งซ่อม', 'ห้องทดสอบ', 'ทดสอบระบบ');
```

**ผลที่ได้** `FOREIGN KEY constraint failed` ✓ ถูกปฏิเสธตามที่ควร

### ② status ไม่อยู่ในค่าที่ CHECK อนุญาต

```sql
INSERT INTO requests (id, requester_id, request_type, location, details, status)
VALUES ('REQ-TEST-CHECK', 1, 'แจ้งซ่อม', 'ห้องทดสอบ', 'ทดสอบ CHECK', 'ยกเลิก');
```

**ผลที่ได้** `CHECK constraint failed` ✓ ถูกปฏิเสธตามที่ควร

### ③ email ซ้ำกับผู้ใช้ที่มีอยู่

```sql
INSERT INTO users (name, department, email)
VALUES ('ผู้ใช้ทดสอบ', 'วิศวกรรมซอฟต์แวร์', 'somchai@rmutl.ac.th');
```

**ผลที่ได้** `UNIQUE constraint failed` ✓ ถูกปฏิเสธตามที่ควร

### ④ id คำร้องซ้ำกับรายการเดิม

```sql
INSERT INTO requests (id, requester_id, request_type, location, details)
VALUES ('REQ-001', 1, 'แจ้งซ่อม', 'ห้องทดสอบ', 'ทดสอบรหัสซ้ำ');
```

**ผลที่ได้** `UNIQUE constraint failed` ✓ ถูกปฏิเสธตามที่ควร

### ⑤ ไม่ระบุ location ซึ่งเป็น NOT NULL

```sql
INSERT INTO requests (id, requester_id, request_type, details)
VALUES ('REQ-TEST-NOTNULL', 1, 'แจ้งซ่อม', 'ทดสอบ NOT NULL');
```

**ผลที่ได้** `NOT NULL constraint failed` ✓ ถูกปฏิเสธตามที่ควร