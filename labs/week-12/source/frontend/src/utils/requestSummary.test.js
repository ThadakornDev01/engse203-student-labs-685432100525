import { describe, test, expect } from 'vitest';
import { summarizeRequests } from './requestSummary.js';

describe('summarizeRequests', () => {
  test('รายการว่าง → ทุกค่าเป็น 0', () => {
    expect(summarizeRequests([])).toEqual({ total: 0, pending: 0, inProgress: 0, completed: 0 });
  });
  const sample = [
    { id: 'REQ-001', requesterName: 'สมชาย ใจดี', requestType: 'แจ้งซ่อม', location: 'ห้อง 301', details: 'เครื่องปรับอากาศไม่ทำงาน', priority: 'urgent', status: 'pending' },
    { id: 'REQ-002', requesterName: 'สุภาวดี รักเรียน', requestType: 'บริการบัญชีผู้ใช้', location: 'อาคารวิศวกรรมซอฟต์แวร์', details: 'เข้าสู่ระบบไม่ได้', priority: 'normal', status: 'in-progress' },
    { id: 'REQ-003', requesterName: 'ธนกฤต ตั้งใจ', requestType: 'ขอใช้อุปกรณ์', location: 'ห้องประชุม 2', details: 'ขอยืมโปรเจกเตอร์', priority: 'normal', status: 'completed' },
    { id: 'REQ-004', requesterName: 'สมชาย ใจดี', requestType: 'แจ้งซ่อม', location: 'ห้อง 302', details: 'คอมพิวเตอร์เปิดไม่ติด', priority: 'urgent', status: 'pending' },
    { id: 'REQ-005', requesterName: 'ปรียา ขยันยิ่ง', requestType: 'อื่น ๆ', location: 'ห้องสมุด', details: 'ขอเพิ่มปลั๊กไฟ', priority: 'normal', status: 'pending' },
  ];
  test('นับครบทุกสถานะ', () => {
    expect(summarizeRequests(sample)).toEqual({ total: 5, pending: 3, inProgress: 1, completed: 1 });
  });
});
