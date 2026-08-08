import { useState } from 'react';

function TaskForm({ onAddTask }) {
  const [formData, setFormData] = useState({
    title: '',
    course: '',
    dueDate: '',
    details: '',
    priority: 'normal',
  });

  const [errors, setErrors] = useState({});

  const [submitStatus, setSubmitStatus] = useState('null');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  function handleSubmit(event) {
    event.preventDefault();
    // TODO LAB4-R05–R07: validate controlled state แล้วเรียก onAddTask
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "กรุณากรอก Title";
    if (!formData.course) newErrors.course = 'กรุณาเลือก Course';
    if (!formData.dueDate) newErrors.dueDate = 'กรุณากรอก Due Date';
    if (!formData.details) newErrors.details = 'กรุณากรอก Details';
    if (!formData.priority) newErrors.priority = 'กรุณาเลือก Priority';

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      setSubmitStatus('error');
      return;
    }

    setSubmitStatus('success');

    onAddTask({
      id: 'REQ-${Date.now().toString().slice(-4)}', // สุ่ม ID ง่ายๆ ด้วยเวลา (เช่น REQ-1234)
      requesterName: 'ผู้ใช้งานระบบ', // TODO LAB4-R05: เปลี่ยนเป็นชื่อผู้ร้องขอจริง
      requestType: 'formData.title', // TODO LAB4-R05: เปลี่ยนเป็นประเภทคำร้องจริง
      location: formData.course,
      dueDate: formData.dueDate,
      details: formData.details,
      priority: formData.priority,
      status: 'pending',  //บังคับเพิ่มแบบ pending
    })

    setFormData({
      title: '',
      course: '',
      dueDate: '',
      details: '',
      priority: 'normal'
    });
  }

  return (
    <section className="panel" aria-labelledby="task-form-title">
      <p className="eyebrow dark">CONTROLLED FORM</p>
      <h2 id="task-form-title">Create New Task</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="title">Title</label>
          <input id="title" name="title" value={formData.title} onChange={handleChange} />
          <small className="error" id="title-error">{errors.title}</small>
        </div>

        <div className="field">
          <label htmlFor="course">Course</label>
          <select id="course" name="course" value={formData.course} onChange={handleChange} defaultValue="">
            <option value="">-- Select a course --</option>
            <option value="ENGSE203">ENGSE203</option>
            <option value="INT201">INT201</option>
            <option value="GEN101">GEN101</option>
          </select>
          <small className="error" id="course-error">{errors.course}</small>
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
