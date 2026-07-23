import { initialTasks } from "../data/initialTasks";

function SummaryPanel() {
    return (
            <section className="panel" aria-labelledby="summary-title">
                <h2 id="summary-title">ภาพรวม</h2>
                <p>ทั้งหมด {initialTasks.length} รายการ</p>
            </section>
    );
}

export default SummaryPanel;