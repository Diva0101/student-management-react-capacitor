import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Home from './Home';
import Students from './students/Students';
import AddStudent from './students/AddStudent';
import EditStudent from './students/EditStudent';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <header className="app-header">
        <div className="app-brand">
          <span className="app-logo">📚</span>
          <span className="app-title">Student Management</span>
        </div>
        <nav className="app-nav">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
            Dashboard
          </NavLink>
          <NavLink to="/students" className={({ isActive }) => (isActive ? 'active' : '')}>
            Students
          </NavLink>
        </nav>
      </header>
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/students" element={<Students />} />
          <Route path="/students/add" element={<AddStudent />} />
          <Route path="/students/edit/:id" element={<EditStudent />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
