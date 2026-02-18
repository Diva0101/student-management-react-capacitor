import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Home.css';

export default function Home() {
  const students = useSelector((state) => state.students.students);
  const total = students.length;
  const courses = [...new Set(students.map((s) => s.course).filter(Boolean))];
  const topGrades = students.filter((s) => s.grade === 'A' || s.grade === 'A+').length;

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Dashboard</h1>
      <p className="dashboard-subtitle">Overview of your student records</p>

      <div className="stat-cards">
        <div className="stat-card stat-total">
          <span className="stat-icon">👥</span>
          <div className="stat-content">
            <span className="stat-value">{total}</span>
            <span className="stat-label">Total Students</span>
          </div>
        </div>
        <div className="stat-card stat-courses">
          <span className="stat-icon">📂</span>
          <div className="stat-content">
            <span className="stat-value">{courses.length}</span>
            <span className="stat-label">Courses</span>
          </div>
        </div>
        <div className="stat-card stat-grades">
          <span className="stat-icon">⭐</span>
          <div className="stat-content">
            <span className="stat-value">{topGrades}</span>
            <span className="stat-label">A / A+ Grades</span>
          </div>
        </div>
      </div>

      <div className="dashboard-actions">
        <Link to="/students" className="dashboard-card link-card">
          <span className="card-icon">📋</span>
          <h3>View All Students</h3>
          <p>Browse, search, and manage the full student list.</p>
        </Link>
        <Link to="/students/add" className="dashboard-card link-card">
          <span className="card-icon">➕</span>
          <h3>Add New Student</h3>
          <p>Register a new student in the system.</p>
        </Link>
      </div>

      {students.length > 0 && (
        <section className="recent-section">
          <h2>Recent Students</h2>
          <ul className="recent-list">
            {students.slice(-5).reverse().map((s) => (
              <li key={s.id}>
                <Link to={`/students/edit/${s.id}`}>{s.name}</Link>
                <span className="recent-meta">{s.course} · {s.grade}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
