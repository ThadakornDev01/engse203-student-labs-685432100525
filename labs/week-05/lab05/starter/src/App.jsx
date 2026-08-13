import AppLayout from './pages/AppLayout.jsx';
import { Routes, Route } from 'react-router-dom';


import AboutPage from './pages/AboutPage.jsx';
import NewRequestPage from './pages/NewRequestPage.jsx';
import RequestDetailPage from './pages/RequestDetailPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';




function App() {
 return (
   <Routes>
     <Route element={<AppLayout />}>
       <Route index element={<DashboardPage />} />
       <Route element={<AboutPage />} path="/about" />
       <Route element={<NewRequestPage />} path="/requests/new" />
       <Route element={<RequestDetailPage />} path="/requests/:requestId" />
       <Route element={<NotFoundPage />} path="*" />
     </Route>
   </Routes>


   // <AppLayout>
   //   <DashboardPage/>
   // </AppLayout>
     /* TODO 5A-CP01: ย้ายงานของ Dashboard ออกไปที่ DashboardPage.jsx */
     /* TODO 5A-CP02: เปลี่ยนทั้งไฟล์เป็น <Routes> ที่มี AppLayout เป็นกรอบ */
 );
}


export default App;
