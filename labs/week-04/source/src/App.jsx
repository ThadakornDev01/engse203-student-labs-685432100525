import { initialTasks } from './data/initialTasks.js';
import AppHeader from './components/AppHeader.jsx';
import SummaryPanel from './components/SummaryPanel.jsx';
import TaskList from './components/TaskList.jsx'
import TaskCard from './components/TaskCard.jsx'

function App() {
  return (
    <>
      <AppHeader
        title="My Study Tasks"
        subtitle="ฝึก React mental model ก่อนทำ LAB04" />

        <main className="container page-content">
          <SummaryPanel/>
          <TaskCard/>
          <TaskList/>
        </main>
      {/* <SummaryPanel /> */}
    </>
  );
}

export default App;

