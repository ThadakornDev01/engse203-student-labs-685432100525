# ผลเปรียบเทียบ Query Plan ของ Index

คำสั่งที่ใช้ตรวจ:

```sql
EXPLAIN QUERY PLAN
SELECT * FROM requests WHERE status = 'pending';
```

Index ที่เพิ่ม:

```sql
CREATE INDEX IF NOT EXISTS idx_requests_status
  ON requests(status);
CREATE INDEX IF NOT EXISTS idx_requests_requester
  ON requests(requester_id);
```

ทำซ้ำผลได้โดยสร้างตารางทดลองใน SQLite ชั่วคราวและใส่ข้อมูล 10,000 แถว โดยตั้ง `pending` ไว้ 1 ใน 100 แถว จากนั้นรัน `EXPLAIN QUERY PLAN` ก่อนและหลังสร้าง index

ผลก่อนสร้าง index:

```text
SCAN requests
```

ผลหลังสร้าง index เมื่อมีข้อมูลมากพอให้ SQLite เลือกใช้ index:

```text
SEARCH requests USING INDEX idx_requests_status (status=?)
```

`SCAN requests` หมายถึง SQLite อ่านทุกแถวเพื่อหา status ที่ตรงกัน ส่วน `SEARCH ... USING INDEX` หมายถึง SQLite ใช้ index ค้นหาแถวตาม status โดยตรง ทั้งนี้ฐานข้อมูลที่มีข้อมูลน้อยมากอาจยังเลือก SCAN เพราะต้นทุนต่ำกว่า แม้จะมี index แล้วก็ตาม
