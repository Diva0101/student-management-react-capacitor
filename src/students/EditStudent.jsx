import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateStudent } from '../slices/studentsSlice';
import './StudentForm.css';

export default function EditStudent() {
  const { id } = useParams();
  const students = useSelector((state) => state.students.students);
  const student = students.find((s) => s.id === id);
  const [form, setForm] = useState({ name: '', email: '', age: '', course: '', grade: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (student) setForm({
      name: student.name,
      email: student.email || '',
      age: student.age || '',
      course: student.course || '',
      grade: student.grade || '',
    });
  }, [student]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!student || !form.name.trim()) return;
    dispatch(updateStudent({
      id: student.id,
      name: form.name.trim(),
      email: form.email.trim() || '—',
      age: form.age || '—',
      course: form.course.trim() || '—',
      grade: form.grade.trim() || '—',
    }));
    navigate('/students');
  };

  if (!student) {
    return (
      <div className="student-form-page">
        <div className="not-found">
          <p>Student not found.</p>
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/students')}>Back to list</button>
        </div>
      </div>
    );
  }

  return (
    <div className="student-form-page">
      <h1>Edit Student</h1>
      <p className="form-subtitle">Update this student&apos;s information.</p>
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
            <button type="submit" className="btn btn-primary">Update Student</button>
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/students')}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
