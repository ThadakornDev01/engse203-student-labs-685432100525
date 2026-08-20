import RequestForm from '../components/RequestForm.jsx';
import { useNavigate } from 'react-router-dom';
import { addRequest } from '../services/requestService.js';

function NewRequestPage() {
  const navigate = useNavigate();

  async function handleAddRequest(input) {
    const created = await addRequest(input);
    navigate(`/requests/${created.id}`);
  }

  return (
    <section data-testid="page-new-request">
      <div className="page-heading"><div><p className="eyebrow dark">CONTROLLED FORM</p><h1>สร้างคำร้องใหม่</h1><p>ตรวจข้อมูลก่อนบันทึก ทุกคำร้องใหม่เริ่มต้นที่ pending</p></div></div>
      <button className="button ghost" data-testid="reset-button" type="button" onClick={handleReset}>
        Reset Demo Data
      </button>

      {/* TODO 5B-CP04a: เรียก addRequest() แล้วใช้ useNavigate() ไปหน้ารายละเอียดของคำร้องที่เพิ่งสร้าง */}
      <section className="panel form-panel">
        <RequestForm onAddRequest={handleAddRequest} />
      </section>
    </section>
  );
}

export default NewRequestPage;
