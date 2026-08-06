import { useState } from 'react';

const INITIAL_FORM_STATE = {
    requesterName: '',
    requestType: '',
    location: '',
    details: '',
    priority: 'normal',
};

function RequestForm({ onAddRequest }) {
    const [formData, setFormData] = useState(INITIAL_FORM_STATE);
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState('idle'); // idle | submitting | success | error

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    function handleSubmit(event) {
        event.preventDefault();
        setStatus('submitting');
        setErrors({});

        const newErrors = {};
        if (!formData.requesterName.trim()) {
            newErrors.requesterName = 'ต้องระบุชื่อผู้แจ้ง';
        }
        if (!formData.requestType) {
            newErrors.requestType = 'ต้องเลือกประเภทคำร้อง';
        }
        if (!formData.location.trim()) {
            newErrors.location = 'ต้องระบุสถานที่';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setStatus('error');
            return;
        }

        onAddRequest(formData);
        setFormData(INITIAL_FORM_STATE);
        setStatus('success');
    }

    return (
        <section className="panel" aria-labelledby="request-form-title">
            <p className="eyebrow dark">CONTROLLED FORM</p>
            <h2 id="request-form-title">สร้างคำร้องใหม่</h2>
            <form onSubmit={handleSubmit} noValidate onFocus={() => setStatus('idle')}>
                <div className="field">
                    <label htmlFor="requesterName">ชื่อผู้แจ้ง</label>
                    <input
                        id="requesterName"
                        name="requesterName"
                        value={formData.requesterName}
                        onChange={handleChange}
                        aria-invalid={!!errors.requesterName}
                        aria-describedby="requesterName-error"
                    />
                    {errors.requesterName && <small className="error" id="requesterName-error">{errors.requesterName}</small>}
                </div>

                <div className="field">
                    <label htmlFor="requestType">ประเภทคำร้อง</label>
                    <select
                        id="requestType"
                        name="requestType"
                        value={formData.requestType}
                        onChange={handleChange}
                        aria-invalid={!!errors.requestType}
                        aria-describedby="requestType-error"
                    >
                        <option value="">-- เลือกประเภท --</option>
                        <option value="แจ้งซ่อม">แจ้งซ่อม</option>
                        <option value="ขอใช้ห้อง">ขอใช้ห้อง</option>
                        <option value="บริการบัญชีผู้ใช้">บริการบัญชีผู้ใช้</option>
                    </select>
                    {errors.requestType && <small className="error" id="requestType-error">{errors.requestType}</small>}
                </div>

                <div className="field">
                    <label htmlFor="location">สถานที่</label>
                    <input
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        aria-invalid={!!errors.location}
                        aria-describedby="location-error"
                    />
                    {errors.location && <small className="error" id="location-error">{errors.location}</small>}
                </div>

                <div className="field">
                    <label htmlFor="details">รายละเอียด</label>
                    <textarea id="details" name="details" rows="4" value={formData.details} onChange={handleChange} />
                </div>

                <fieldset className="field"> {/* ยังคง className="field" เพื่อให้ได้ margin-bottom ที่สอดคล้องกับ field อื่นๆ */}
                    <legend>ความเร่งด่วน</legend>
                    <div className="radio-group"> {/* เพิ่ม div เพื่อจัดกลุ่ม radio buttons และควบคุม layout */}
                        <label>
                            <input type="radio" name="priority" value="normal" checked={formData.priority === 'normal'} onChange={handleChange} /> ปกติ
                        </label>
                        <label>
                            <input type="radio" name="priority" value="urgent" checked={formData.priority === 'urgent'} onChange={handleChange} /> เร่งด่วน
                        </label>
                    </div>
                </fieldset>

                <button type="submit" disabled={status === 'submitting'}>
                    {status === 'submitting' ? 'กำลังเพิ่ม...' : 'เพิ่มคำร้อง'}
                </button>
                {status === 'success' && <p className="status" role="status">เพิ่มคำร้องสำเร็จ</p>}
                {status === 'error' && <p className="status error" role="alert">โปรดแก้ไขข้อผิดพลาดในฟอร์ม</p>}
            </form>
        </section>
    );
}

export default RequestForm;
