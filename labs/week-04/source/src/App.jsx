import AppHeader from './components/AppHeader.jsx';
import SummaryPanel from './components/SummaryPanel.jsx';
import RequestForm from './components/RequestForm.jsx';
import FilterBar from './components/FilterBar.jsx';
import RequestList from './components/RequestList.jsx';
import { initialRequests } from './data/initialRequests.js';
import { useState } from 'react';

function App() {
  // TODO LAB4-R04: เปลี่ยน requests/statusFilter เป็น state
  const [requests, setRequests] = useState(initialRequests);
  const [statusFilter, setStatusFilter] = useState('all');

  // TODO LAB4-R04: คำนวณ summary เป็น derived data
const summary = {
    total: requests.length,
    pending: requests.filter((req) => req.status === 'pending').length,
    inProgress: requests.filter((req) => req.status === 'in-progress').length,
    completed: requests.filter((req) => req.status === 'completed').length,
  };
  //ใช้ฟังก์ชัน .filter() ของ JavaScript เพื่อกรองหาเฉพาะรายการที่มี status 
  // ตรงกับที่กำหนด แล้วต่อด้วย .length เพื่อนับจำนวนว่ามีกี่อัน

  // TODO LAB4-R08: คำนวณ filteredRequests จาก requests + statusFilter
  const filteredRequests = requests.filter((request) => {
    if (statusFilter === 'all') {
      return true; // แสดงทุกคำร้อง
    }
    return request.status === statusFilter;
  });

  function handleAddRequest(requestData) {
    console.log('ข้อมูลที่ส่งมาเพิ่ม', requestData);
    setRequests((prevRequests) => [requestData, ...prevRequests]);
  }

  function handleDeleteRequest(requestId) {
    setRequests((prevRequests) =>
        prevRequests.filter((request) => request.id !== requestId)
    );
  }

  return (
    <>
      <AppHeader
        title="Campus Service Request"
        subtitle="LAB 4 Starter — เปลี่ยน DOM-driven UI เป็น State-driven React UI"
      />
      <main className="container page-content">
        <SummaryPanel summary={summary} />
        <div className="workspace-grid">
          <RequestForm onAddTask={handleAddRequest} />
          <section className="panel" aria-labelledby="request-list-title">
            <div className="section-heading">
              <h2 id="request-list-title">รายการคำร้อง</h2>
              <FilterBar value={statusFilter} onFilterChange={setStatusFilter} />
            </div>
            <RequestList
              requests={filteredRequests}
              onDeleteRequest={handleDeleteRequest}
            />
          </section>
        </div>
      </main>
    </>
  );
}

export default App;

