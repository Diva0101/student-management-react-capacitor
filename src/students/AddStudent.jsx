import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addStudent } from '../slices/studentsSlice';
import './StudentForm.css';

const initialForm = { name: '', email: '', age: '', course: '', grade: '' };

export default function AddStudent() {
  const [form, setForm] = useState(initialForm);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    dispatch(addStudent({
      name: form.name.trim(),
      email: form.email.trim() || '—',
      age: form.age || '—',
      course: form.course.trim() || '—',
      grade: form.grade.trim() || '—',
    }));
    navigate('/students');
  };

  return (
    <div className="student-form-page">
      <h1>Add Student</h1>
      <p className="form-subtitle">Register a new student in the system.</p>
      <div className="student-form-card">
        <form className="student-form" onSubmit={handleSubmit}>
          <div className="field">
            <label>Name <span className="required">*</span></label>
            <input name="name" value={form.name} onChange={handleChange} placeholder="Full name" required />
          </div>
          <div className="field">
            <label>Email</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="email@example.com" />
          </div>
          <div className="field">
            <label>Age</label>
            <input name="age" type="number" min="1" max="120" value={form.age} onChange={handleChange} placeholder="Age" />
          </div>
          <div className="field">
            <label>Course</label>
            <input name="course" value={form.course} onChange={handleChange} placeholder="e.g. Computer Science" />
          </div>
          <div className="field">
            <label>Grade</label>
            <input name="grade" value={form.grade} onChange={handleChange} placeholder="e.g. A, B+" />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">Save Student</button>
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/students')}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
