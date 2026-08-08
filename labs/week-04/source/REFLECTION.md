# Pre-LAB 04 Reflection — CP07

ชื่อ–นามสกุล: นาย ธดากรณ์ เชื้อโต่ง
รหัสนักศึกษา: 685432100525

1. Component ใดเป็น state owner ของ tasks และ statusFilter เพราะเหตุใด?

   คำตอบ: App component เป็น state owner ของ tasks และ statusFilter เพราะข้อมูลทั้งสองถูกเก็บไว้ใน App และถูกใช้ร่วมกันสำหรับการคำนวณ summary และการกรองรายการคำร้อง ก่อนหน้านี้ข้อมูลถูกจัดการแบบ DOM-driven แต่ตอนนี้ถูกย้ายมาเป็น React state เพื่อให้ UI อัปเดตอัตโนมัติและทำงานได้ถูกต้องเมื่อมีการเพิ่ม/ลบ/กรอง

2. ระบุตัวอย่าง Props ลงอย่างน้อย 2 จุด และ callback event ขึ้นอย่างน้อย 1 จุด

   คำตอบ: ตัวอย่าง props ที่ส่งลงไปคือ RequestForm รับ prop onAddTask เพื่อรับข้อมูลคำร้องใหม่จากฟอร์ม และ FilterBar รับ prop value กับ onFilterChange เพื่อสื่อสารสถานะการกรองกลับไปยัง App อีกตัวอย่างคือ RequestList รับ props tasks และ onDeleteRequest เพื่อแสดงรายการคำร้องและส่งเหตุการณ์ลบกลับขึ้นไปยัง App

3. เมื่อนำ pattern ไปใช้ LAB 4 ต้องเปลี่ยน data contract, validation และ component responsibility อย่างไร?

   คำตอบ: ต้องเปลี่ยนจากการใช้ DOM เป็น state-driven data contract โดยให้ข้อมูลคำร้องอยู่ใน state และส่งผ่าน props ให้ child component ใช้งาน การ validation ก็ต้องย้ายจากการจัดการใน DOM มาเป็น state ของฟอร์มและ error state ของ React ส่วน component responsibility ก็ต้องแยกให้แต่ละ component รับผิดชอบหน้าที่เฉพาะ เช่น RequestForm รับผิดชอบการกรอกและตรวจสอบข้อมูล, RequestList รับผิดชอบแสดงรายการ, และ App รับผิดชอบการจัดการ state และ business logic

