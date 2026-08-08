import { useState } from 'react';

function TaskForm({ onAddTask }) {
  const [formData, setFormData] = useState({
    requesterName: '',
    requestType: '',
    location: '',
    dueDate: '',
    details: '',
    priority: 'normal',
  });

  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  function handleSubmit(event) {
    event.preventDefault();
    const newErrors = {};

    if (!formData.requesterName?.trim() || formData.requesterName.trim().length < 2) {
      newErrors.requesterName = 'กรุณากรอก Requester Name อย่างน้อย 2 ตัวอักษร';
    }

    if (!formData.requestType) {
      newErrors.requestType = 'กรุณาเลือก Request Type';
    }

    if (!formData.location?.trim()) {
      newErrors.location = 'กรุณากรอก Location';
    }

    if (!formData.dueDate) {
      newErrors.dueDate = 'กรุณาเลือก Due Date';
    }

    if (!formData.details?.trim() || formData.details.trim().length < 10) {
      newErrors.details = 'รายละเอียดต้องมีอย่างน้อย 10 ตัวอักษร';
    }

    if (!['normal', 'high', 'urgent'].includes(formData.priority)) {
      newErrors.priority = 'กรุณาเลือก Priority ให้ถูกต้อง';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setSubmitStatus('error');
      return;
    }

    setSubmitStatus('success');

    onAddTask({
      id: `REQ-${Date.now().toString().slice(-4)}`,
      requesterName: formData.requesterName.trim(),
      requestType: formData.requestType,
      location: formData.location.trim(),
      dueDate: formData.dueDate,
      details: formData.details.trim(),
      priority: formData.priority,
      status: 'pending'
    });

    setFormData({
      requesterName: '',
      requestType: '',
      location: '',
      dueDate: '',
      details: '',
      priority: 'normal'
    });

    setTimeout(() => setSubmitStatus(null), 3000);
  }

  return (
    <section className="panel" aria-labelledby="task-form-title">
      <p className="eyebrow dark">CONTROLLED FORM</p>
      <h2 id="task-form-title">Create New Task</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="requesterName">Requester Name</label>
          <input id="requesterName" name="requesterName" value={formData.requesterName} onChange={handleChange} />
          <small className="error" id="requesterName-error">{errors.requesterName}</small>
        </div>

        <div className="field">
          <label htmlFor="requestType">Request Type</label>
          <select id="requestType" name="requestType" value={formData.requestType} onChange={handleChange}>
            <option value="">-- Select Request Type --</option>
            <option value="แจ้งซ่อม">แจ้งซ่อม</option>
            <option value="ขอความช่วยเหลือ">ขอความช่วยเหลือ</option>
            <option value="อื่นๆ">อื่นๆ</option>
          </select>
          <small className="error" id="requestType-error">{errors.requestType}</small>
        </div>

        <div className="field">
          <label htmlFor="location">Location</label>
          <input id="location" name="location" value={formData.location} onChange={handleChange} />
          <small className="error" id="location-error">{errors.location}</small>
        </div>

        <div className="field">
          <label htmlFor="dueDate">Due Date</label>
          <input id="dueDate" name="dueDate" type="date" value={formData.dueDate} onChange={handleChange} />
          <small className="error" id="dueDate-error">{errors.dueDate}</small>
        </div>

        <div className="field">
          <label htmlFor="details">Details</label>
          <textarea id="details" name="details" rows="2" value={formData.details} onChange={handleChange}></textarea>
          <small className="error" id="details-error">{errors.details}</small>
        </div>

        <fieldset className="field">
          <legend>Priority</legend>
          <label><input type="radio" name="priority" value="normal" checked={formData.priority === 'normal'} onChange={handleChange} /> Normal</label>
          <label><input type="radio" name="priority" value="high" checked={formData.priority === 'high'} onChange={handleChange} /> High</label>
          <small className="error" id="priority-error">{errors.priority}</small>
        </fieldset>

        <button type="submit">Add Task</button>
        {submitStatus === 'success' && (
          <p className="status" role="status">คำร้องถูกเพิ่มเรียบร้อยแล้ว</p>
        )}
        {submitStatus === 'error' && (
          <p className="status error" role="alert">กรุณากรอกข้อมูลให้ครบถ้วน</p>
        )}
      </form>
    </section>
  );
}

export default TaskForm;