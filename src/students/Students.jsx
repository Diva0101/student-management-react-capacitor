import { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeStudent } from '../slices/studentsSlice';
import './Students.css';

const SORT_KEYS = { name: 'Name', email: 'Email', age: 'Age', course: 'Course', grade: 'Grade' };

export default function Students() {
  const students = useSelector((state) => state.students.students);
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortAsc, setSortAsc] = useState(true);
  const [deleteId, setDeleteId] = useState(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return students;
    return students.filter(
      (s) =>
        (s.name && s.name.toLowerCase().includes(q)) ||
        (s.email && s.email.toLowerCase().includes(q)) ||
        (s.course && s.course.toLowerCase().includes(q)) ||
        (String(s.grade).toLowerCase().includes(q))
    );
  }, [students, search]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const aVal = a[sortBy] ?? '';
      const bVal = b[sortBy] ?? '';
      const cmp = String(aVal).localeCompare(String(bVal), undefined, { numeric: sortBy === 'age' });
      return sortAsc ? cmp : -cmp;
    });
  }, [filtered, sortBy, sortAsc]);

  const handleSort = (key) => {
    if (sortBy === key) setSortAsc((v) => !v);
    else setSortBy(key);
  };

  const confirmDelete = (id) => setDeleteId(id);
  const cancelDelete = () => setDeleteId(null);
  const doDelete = () => {
    if (deleteId) dispatch(removeStudent(deleteId));
    setDeleteId(null);
  };

  const courseCount = useMemo(() => {
    const map = {};
    students.forEach((s) => {
      const c = s.course || '—';
      map[c] = (map[c] || 0) + 1;
    });
    return map;
  }, [students]);

  return (
    <div className="students-page">
      <header className="students-header">
        <div>
          <h1>Students</h1>
          <p className="students-desc">Search, sort, and manage all student records.</p>
        </div>
        <Link to="/students/add" className="btn btn-primary btn-add">
          + Add Student
        </Link>
      </header>

      <div className="students-toolbar">
        <div className="search-wrap">
          <span className="search-icon" aria-hidden>🔍</span>
          <input
            type="search"
            placeholder="Search by name, email, course, grade…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="sort-wrap">
          <span className="sort-label">Sort by</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
            aria-label="Sort by"
          >
            {Object.entries(SORT_KEYS).map(([k, label]) => (
              <option key={k} value={k}>{label}</option>
            ))}
          </select>
          <button
            type="button"
            className="btn btn-sort"
            onClick={() => setSortAsc((v) => !v)}
            title={sortAsc ? 'Ascending' : 'Descending'}
            aria-label={sortAsc ? 'Sort ascending' : 'Sort descending'}
          >
            {sortAsc ? '↑' : '↓'}
          </button>
        </div>
      </div>

      <div className="students-stats">
        <div className="students-stat">
          <span className="students-stat-value">{sorted.length}</span>
          <span className="students-stat-label">Showing</span>
        </div>
        {search && (
          <div className="students-stat muted">
            <span className="students-stat-value">{students.length}</span>
            <span className="students-stat-label">Total</span>
          </div>
        )}
      </div>

      <div className="students-table-wrap">
        <table className="students-table">
          <thead>
            <tr>
              {Object.entries(SORT_KEYS).map(([key, label]) => (
                <th key={key}>
                  <button
                    type="button"
                    className={`th-sort ${sortBy === key ? 'active' : ''}`}
                    onClick={() => handleSort(key)}
                  >
                    {label}
                    {sortBy === key && <span className="th-arrow">{sortAsc ? ' ↑' : ' ↓'}</span>}
                  </button>
                </th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sorted.length === 0 ? (
              <tr>
                <td colSpan={6} className="empty-state">
                  {search ? (
                    <>No students match "<strong>{search}</strong>". Try a different search.</>
                  ) : (
                    <>No students yet. <Link to="/students/add">Add one</Link></>
                  )}
                </td>
              </tr>
            ) : (
              sorted.map((s) => (
                <tr key={s.id}>
                  <td><strong>{s.name}</strong></td>
                  <td>{s.email}</td>
                  <td>{s.age}</td>
                  <td>
                    <span className="course-tag" title={courseCount[s.course] ? `${courseCount[s.course]} in this course` : ''}>
                      {s.course}
                    </span>
                  </td>
                  <td><span className={`grade-badge grade-${(s.grade || '').replace(/\+/g, 'plus')}`}>{s.grade}</span></td>
                  <td className="actions">
                    <Link to={`/students/edit/${s.id}`} className="btn btn-sm btn-edit">Edit</Link>
                    <button type="button" className="btn btn-sm btn-delete" onClick={() => confirmDelete(s.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {deleteId && (
        <div className="modal-backdrop" onClick={cancelDelete} role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h2 id="modal-title">Delete student?</h2>
            <p>This action cannot be undone.</p>
            <div className="modal-actions">
              <button type="button" className="btn btn-secondary" onClick={cancelDelete}>Cancel</button>
              <button type="button" className="btn btn-delete" onClick={doDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
